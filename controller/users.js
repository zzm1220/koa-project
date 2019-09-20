const jwt = require('jsonwebtoken')
const User= require("../models/users")
const { secret } = require('../config')
class UserCtl {
    // 获取用户列表
    async find(ctx, next) {
        ctx.body = await User.find();
    }
    // 获取特定用户
    async findById(ctx, next) {
        const id = ctx.params.id
        const user = await User.findById(id)
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
}

module.exports = new UserCtl()