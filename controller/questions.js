const Question = require("../models/questions")

class QuestionCtl {
    // 查找问题
    async find(ctx, next) {
        const { per_page=10 } = ctx.query // 每页个数
        const page = Math.max(ctx.query.page * 1, 1) - 1
        const perPage = Math.max(per_page * 1, 1)
        const q = new RegExp(ctx.query.q)
        const questions = await Question
            .find({ $or: [{title: q}, {description: q}]})
            .limit(perPage).skip(perPage * page)
        ctx.body = questions
    }
    // 查找特定问题
    async findById(ctx, next) {
        const id = ctx.params.id // 问题id
        const { fields = '' } = ctx.query
        const selectFields = fields.split(";").filter(f => f)
                                .map(f => " +" + item)
                                .join(" ")
        const question = await Question.findById(id)
                            .select(selectFields)
                            .populate('questioner topics')
        if (!question) ctx.throw(404, '该问题不存在')
        ctx.body = question
    }
    // 新增问题
    async create(ctx, next) {
        ctx.verifyParams({
            title: {type: 'string', required: true},
            description: {type: 'string', required: false}
        })
        const question = await new Question({...ctx.request.body, questioner: ctx.state.user._id}).save()
        ctx.body = question
    }
    // 删除问题
    async deleteQuestion(ctx, next) {
        const id = ctx.params.id // 删除问题的id
        const delQuestion = await Question.findByIdAndRemove(id)
        if (!delQuestion) ctx.throw(404, 该问题不存在)
        ctx.status = 204
    }
    // 修改问题
    async update(ctx, next) {
        const id = ctx.params.id // 修改问题的id
        // 验证参数
        ctx.verifyParams({
            title: {type: 'string', required: false},
            description: {type: 'string', required: false}
        })
        const updateQuestion = ctx.request.body
        const question = await ctx.state.question.update(updateQuestion)
        ctx.body = updateQuestion
    }
}

module.exports = new QuestionCtl()