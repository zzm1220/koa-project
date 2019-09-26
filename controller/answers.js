const Answer = require("../models/answers")

class AnswerCtl {
    async find(ctx, next) {
        // 每页个数
        const { per_page = 10 } = ctx.query
        const perPage = Math.max(per_page * 1, 1)
        // 第几页
        const page = Math.max(ctx.query.page * 1, 1) - 1
        const q = new RegExp(ctx.query.q)
        const questionId = ctx.params.questionId
        const answers = await Answer.find({content: q, questionId})
                        .limit(perPage)
                        .skip(perPage * page)
        ctx.body = answers
    }
    async findById(ctx, next) {
        const id = ctx.params.id // 问题id
        const answer = await Answer.findById(id).populate('answerer')
        ctx.body = answer
    }
    async create(ctx, next) {
        // 验证参数
        ctx.verifyParams({
            content: {type: 'string', required: true}
        })
        const answerer = ctx.state.user._id
        const questionId = ctx.params.questionId
        console.log(answerer, questionId)
        const answer = await new Answer({...ctx.request.body, answerer, questionId}).save()
        ctx.body = answer
    }
    async update(ctx, next) {
        ctx.verifyParams({
            content: {type: 'string', required: false}
        })
        const updateAnsweer = await ctx.state.answer.update(ctx.request.body)
        ctx.body = ctx.state.answer
    }
    async delete(ctx, next) {
        const id = ctx.params.id
        const delAnswer = await Answer.findByIdAndRemove(id)
        if (!delAnswer) ctx.throw(404, 该问题不存在)
        ctx.status = 204
    }
}

module.exports = new AnswerCtl()