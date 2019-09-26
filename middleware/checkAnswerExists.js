const Answer = require("../models/answers")

const checkAnswerExists = async (ctx, next) => {
    const answer = await Answer.findById(ctx.params.id).select("+answerer")
    if (!answer) ctx.throw(404, '问题不存在')
    if(ctx.params.questionId && answer.questionId !== ctx.params.questionId) ctx.throw(404, '该问题下没有此答案')
    ctx.state.answer = answer
    await next()
}

const checkAnswerer = async (ctx, next) => {
    const { user, answer } = ctx.state
    if (answer.answerer.toString() !== user._id) {
        ctx.throw(403,'没有权限')
    }
    await next()
}

module.exports = {
    checkAnswerExists,
    checkAnswerer
}