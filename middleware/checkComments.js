const Comments = require("../models/comments")

const checkCommentsExist = async (ctx, next) => {
    // 获取问题id, 答案id, 评论id
    const { questionId, answerId, id } = ctx.params
    const comment = await Comments.findById(id).select("+commentator")
    if (!comment) ctx.throw(404, '没有该评论')
    if (questionId && comment.questionId !== questionId) ctx.throw(404, '该问题下没有该评论')
    if (answerId && comment.answerId !== answerId) ctx.throw(404, '该回答下没有该评论')
    ctx.state.comment = comment
    await next()
}

const checkCommentator = async (ctx, next) => {
    const { comment } = ctx.state
    if (comment.commentator.toString() !== ctx.state.user._id) ctx.throw(403, '没有权限')
    await next()
}

module.exports = { checkCommentsExist, checkCommentator }