const User= require("../models/users")

const checkUserExists = async (ctx, next) => {
    // 获取关注/取消关注 ID
    const id = ctx.params.id
    const user = await User.findById(id)
    if (!user) ctx.throw(404, '用户不存在')
    await next()
}

module.exports = checkUserExists