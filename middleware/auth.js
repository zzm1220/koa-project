const auth = async (ctx, next) => {
    if (ctx.url !== '/users') {
        ctx.throw(401)
    }
    await next()
}

module.exports = auth