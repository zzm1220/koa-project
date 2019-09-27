const Comments = require("../models/comments")

class CommentsCtl {
    //  查找所有
    async find(ctx, next) {
        // 每页查询个数, 第几页
        const { per_page = 10, rootCommentId } = ctx.query
        const perPage = Math.max(per_page * 1, 1)
        const page = Math.max(ctx.query.page * 1, 1 ) - 1
        // 模糊查询
        const q = new RegExp(ctx.query.q)
        const { questionId, answerId } = ctx.params
        // 进行数据查询
        const comments = await Comments.find({comment: q, answerId, questionId, rootCommentId})
                                .limit(perPage).skip(perPage * page)
                                .populate('commentator replyTo')
        ctx.body = comments
    }
    //  查找单个
    async findById(ctx, next) {
        const id = ctx.params.id // 评论id
        console.log(id)
        const { fields="" } = ctx.query
        const selectFields = fields.split(";").filter(f => f)
                                .map(f => " +" + f)
                                .join('')
        const comment = await Comments.findById(id)
                                .select(selectFields)
                                .populate("commentator")
        ctx.body = comment
    }
    // 新增评论
    async create(ctx, next) {
        ctx.verifyParams({
            comment: {
                type: 'string',
                required: true
            },
            rootCommentId: {
                type: 'string',
                required: false
            },
            replyTo: {
                type: 'string',
                required: false
            }
        })
        const commentator = ctx.state.user._id
        const { questionId, answerId } = ctx.params
        const comment = await new Comments({
            ...ctx.request.body,
            commentator,
            questionId,
            answerId
        }).save()
        ctx.body = comment
    }
    // 更新评论
    async update(ctx, next) {
        ctx.verifyParams({
            comment: {
                type: 'string',
                required: true
            }
        })
        const comment = ctx.state.comment
        const { content } = ctx.request.body
        const updatecomment = await comment.update({ content })
        ctx.body = comment
    }
    // 删除评论
    async delete(ctx, next) {
        const id = ctx.params.id // 评论id
        const deleteComment = await Comments.findByIdAndRemove(id)
        if (!deleteComment) ctx.throw(404, "该问题不存在")
        ctx.status  = 204
    }
}

module.exports = new CommentsCtl()