const Question = require("../models/questions")

const checkQuestionExist = async (ctx, next) => {
    const id = ctx.params.id
    const question = await Question.findById(id).select('+questioner')
    if (!question) ctx.throw(404, '问题不存在')
    ctx.state.question = question
    await next()
}

module.exports = checkQuestionExist