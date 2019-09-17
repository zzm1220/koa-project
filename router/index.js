const homeRouter = require('./home')
const userRouter = require('./users')

module.exports = app => {
    homeRouter(app)
    userRouter(app)
}