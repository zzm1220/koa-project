const Router = require('koa-router')

const userRouter = new Router({
    prefix: '/users'
})

// 查找用户列表
userRouter.get('/', async (ctx, next) => {
    ctx.body = [{name: 'zhimin', age: 22},{name: 'wenting', age: 23}]
})
// 查找特定用户
userRouter.get('/:id', async (ctx, next) => {
    const { id } = ctx.params
    ctx.body = `特定用户是${id}`
})

// 新建用户
userRouter.post('/', async (ctx, next) => {
    ctx.body = {name: '李磊', age: 28}
})

// 修改用户
userRouter.patch('/:id', async (ctx, next) => {
    ctx.body = {name: '李蕾', age: 33}
})
// 删除用户
userRouter.delete('/:id', async (ctx, next) => {
    const id = ctx.params.id
    ctx.status = 204
})

module.exports = app => {
    app.use(userRouter.routes())
    app.use(userRouter.allowedMethods())
}