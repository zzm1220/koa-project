const checkQuestioner = async (ctx, next) => {
    const { question } = ctx.state
    if (question.questioner.toString() !== ctx.state.user._id) {
        ctx.throw(403, '没有权限')
    }
    await next()
}
module.exports = checkQuestioner