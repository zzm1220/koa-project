const jwt = require('jsonwebtoken')
const User= require("../models/users")
const { secret } = require('../config')
class UserCtl {
    // 获取用户列表
    async find(ctx, next) {
        // 分页查找
        const { per_page = 10 } = ctx.query
        // 每页页数
        const perPage = Math.max(per_page * 1, 1)
        // 查找第几页
        const page = Math.max(ctx.query.page * 1, 1) - 1
        ctx.body = await User.find({
            name: new RegExp(ctx.query.q)
        }).limit(perPage).skip(page * perPage);
    }
    // 获取特定用户
    async findById(ctx, next) {
        const id = ctx.params.id
        const { fields = '' } = ctx.query //a;b;c
        // 查找fields
        const selectFields = fields.split(";")
                                   .filter(f => f)
                                   .map(f => " +" + f)
                                   .join('')
        // 需要populate的字段
        const populateFields = fields.split(";")
                                     .filter(f => f)
                                     .map(f => {
                                         if (f === "employments") {
                                            return "employments.compony employments.job"
                                         }
                                         if (f === "educations") {
                                            return "educations.school educations.major"
                                         }
                                         return f
                                     }).join(" ")
        const user = await User.findById(id).select(selectFields)
                            .populate(populateFields)
        if(!user) ctx.throw(404, '用户不存在')
        ctx.body = user
    }
    // 创建用户
    async create(ctx, next) {
        ctx.verifyParams({
            name: {
                type: 'string',
                required: true
            },
            age: {
                type: 'number',
                required: true
            },
            password: {
                type: 'string',
                required: true
            }
        })
        const userData = ctx.request.body
        const { name } = userData
        const repeatUsername = await User.findOne({ name })
        if (repeatUsername) ctx.throw(409, '用户已经存在')
        const user = await new User(userData).save()
        ctx.body = user
    }
    // 更新用户
    async update(ctx, next) {
        const id = ctx.params.id
        ctx.verifyParams({
            name: {
                type: 'string',
                required: false
            },
            age: {
                type: 'number',
                required: false
            },
            password: {
                type: 'string',
                required: false
            },
            avatar_url: {
                type: 'string',
                required: false
            },
            gender: {
                type: 'string',
                required: false
            },
            headline: {
                type: 'string',
                required: false
            },
            locations: {
                type: 'array',
                itemType: 'string',
                required: false
            },
            business: {
                type: 'string',
                required: false
            },
            employments: {
                type: 'array',
                itemType: 'object',
                required: false
            },
            educations: {
                type: 'array',
                itemType: 'object',
                required: false
            }
        })
        const updateUser = ctx.request.body
        const user = await User.findByIdAndUpdate(id, updateUser)
        if (!user) ctx.throw(404, '用户不存在')
        ctx.body = updateUser
    }
    // 删除用户
    async deleteUser(ctx, next) {
        const id = ctx.params.id
        const user = await User.findByIdAndRemove(id)
        if (!user) ctx.throw(404, '用户不存在')
        ctx.status = 204
    }
    // 登录
    async login(ctx, next) {
        ctx.verifyParams({
            name: {
                type: 'string',
                required: true
            },
            password: {
                type: 'string',
                required: true
            }
        })
        const user = await User.findOne(ctx.request.body)
        if (!user) ctx.throw(401, '用户名或密码不正确')
        const {_id, name} = user;
        const token = jwt.sign({_id, name}, secret, {expiresIn: '1d'})
        ctx.body = {token}
    }
    // 获取关注者
    async listFollowing(ctx, next) {
        const { id } = ctx.params
        const user = await User.findById(id).select('+following').populate('following')
        if (!user) ctx.throw(404)
        ctx.body = user.following;
    }
    // 关注某人
    async follow(ctx, next) {
       const user = ctx.state.user
       const userFollowingId = ctx.params.id
       const me = await User.findById(user._id).select('+following')
       if (!me.following.map(id => id.toString()).includes(userFollowingId)) {
            me.following.push(userFollowingId)
            me.save()
       }
       ctx.status = 204
    }
    // 取消关注某个人
    async unfollow(ctx, next) {
        // 当前登录用户
        const user = ctx.state.user
        // 取消关注用户Id
        const userUnFollowingId = ctx.params.id
        // 当前登录用户关注的following
        const me = await User.findById(user._id).select('+following')
        // 取消关注用户Id在myFollowing中的index
        const index = me.following.map(id => id.toString()).indexOf(userUnFollowingId)
        if (index > -1) {
            me.following.splice(index, 1)
            me.save()
        }
        ctx.status = 204
    }
    // 获取粉丝
    async listFollowers(ctx, next) {
        const listFollowers = await User.find({following: ctx.params.id})
        ctx.body = listFollowers
    }
    // 用户关注某个话题
    async followTopic(ctx, next) {
        const topicId = ctx.params.id // 话题id
        const user = ctx.state.user // 登录用户
        const me = await User.findById(user._id).select('+followingTopics')
        if (!me.followingTopics.map(id => id.toString()).includes(topicId)) {
            me.followingTopics.push(topicId)
            me.save()
        }
        ctx.status = 204
    }
    // 用户取消关注某个话题
    async unfollowTopic(ctx, next) {
        const topicId = ctx.params.id // 话题id
        const user = ctx.state.user // 登录用户user
        const me = await User.findById(user._id).select('+followingTopics')
        const index = me.followingTopics.indexOf(topicId)
        if (index > -1) {
            me.followingTopics.splice(index, 1)
            me.save()
        }
        ctx.status = 204
    }
    // 获取用户关注的话题列表
    async listFollowTopics(ctx, next) {
        const id = ctx.params.id
        const user = await User.findById(id).select("+followingTopics").populate("followingTopics")
        if (!user) ctx.throw(404)
        ctx.body = user.followingTopics
    }
}

module.exports = new UserCtl()