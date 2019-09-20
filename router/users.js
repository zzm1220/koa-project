const Router = require('koa-router')

const userRouter = new Router({
    prefix: '/users'
})

const auth = require('../middleware/auth')
const checkOwner = require('../middleware/checkOwner')

const { 
    find, 
    findById, 
    create, 
    update, 
    deleteUser,
    login
} = require('../controller/users')
// 查找用户列表
userRouter.get('/', find)

// 查找特定用户
userRouter.get('/:id', findById)

// 新建用户
userRouter.post('/', create)

// 修改用户
userRouter.patch('/:id', auth, checkOwner, update)

// 删除用户
userRouter.delete('/:id', auth, checkOwner, deleteUser)

// 用户登录
userRouter.post('/login', login)

module.exports = app => {
    app.use(userRouter.routes())
    app.use(userRouter.allowedMethods())
}