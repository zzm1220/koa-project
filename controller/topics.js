const Topic = require('../models/topics')
const User = require('../models/users')
const Question = require('../models/questions')

class TopicCtl {
    // 查找话题
    async find(ctx, next) {
        // 分页使用 limit, skip API进行操作
        const { per_page = 10 } = ctx.query
        // 每页条数
        const perPage = Math.max(per_page * 1, 1)
        // 当前第几页
        const page = Math.max(ctx.query.page * 1 , 1) - 1
        // 模糊搜索，分页查找
        ctx.body = await Topic.find({
            name: new RegExp(ctx.query.q)
        }).limit(perPage).skip(page * perPage)
    }
    // 查找特定话题
    async findById(ctx, next) {
        const id = ctx.params.id
        const { fields = '' } = ctx.query
        const selectFields = fields.split(";")
                                .filter(f => f)
                                .map(item => " +"+item)
                                .join("")
        const topic = await Topic.findById(id).select(selectFields)
        if (!topic) ctx.throw(404, '话题不存在')
        ctx.body = topic
    }
    // 新增话题
    async create(ctx, next) {
        ctx.verifyParams({
            name: {type: 'string', required: true},
            avatar_url: {type: 'string', required: false},
            intro: {type: 'string', required: false}
        })
        const topic = await new Topic(ctx.request.body).save();
        ctx.body = topic
    }
    // 修改话题
    async update(ctx, next) {
        const id = ctx.params.id
        ctx.verifyParams({
            name: {type: 'string', required: false},
            avatar_url: {type: 'string', required: false},
            intro: {type: 'string', required: false}  
        })
        const updateTopic = ctx.request.body
        const topic = await Topic.findByIdAndUpdate(id, updateTopic)
        if (!topic) ctx.throw(404, '没有该话题')
        ctx.body = topic
    }
    // 获取该话题被多少人关注
    async listTopicFollowers(ctx, next) {
        const users = await User.find({ followingTopics: ctx.params.id})
        ctx.body = users
    }
    // 获取话题下的问题列表
    async listQuestions(ctx, next) {
        const questions = await Question.find({topics: ctx.params.id})
        ctx.body = questions
    }
}

module.exports = new TopicCtl()