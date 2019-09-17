const Router = require('koa-router')

const router = new Router()
router.get('/', async (ctx, next) => {
    ctx.body = 'this is home'
})

module.exports = app => {
    app.use(router.routes())
    app.use(router.allowedMethods())
}