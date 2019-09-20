const jwt = require("jsonwebtoken")
const { secret } = require("../config")
// 用户认证
const auth = async (ctx, next) => {
    const { authorization = '' } = ctx.header
    const token = authorization.replace("Bearer ","")
    try {
        const user = jwt.verify(token, secret)
        ctx.state.user = user
    } catch(err) {
        ctx.throw(401, err.message)
    }
    await next()
}

module.exports = auth