const Router = require('koa-router')
const { index, upload } = require('../controller/home')

const router = new Router()
router.get('/', async (ctx, next) => {
    index(ctx)
})
router.post('/upload', upload)

module.exports = app => {
    app.use(router.routes())
    app.use(router.allowedMethods())
}