const Router = require("koa-router")
const auth = require('../middleware/auth')
const checkTopicExists = require('../middleware/checkTopicExists')

const router = new Router({
    prefix: '/topics'
})
const {
    find,
    findById,
    create,
    update,
    listTopicFollowers,
    listQuestions
} = require("../controller/topics")

router.get('/', find)
router.get('/:id', findById)
router.post('/', auth, create)
router.patch('/:id', auth, checkTopicExists, update)
router.get('/:id/followers', checkTopicExists, listTopicFollowers)
router.get('/:id/questions', checkTopicExists, listQuestions)

module.exports = app => {
    app.use(router.routes())
    app.use(router.allowedMethods())
}