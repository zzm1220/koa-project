const Router = require("koa-router")
const auth = require('../middleware/auth')

const router = new Router({
    prefix: '/questions/:questionId/answers/:answerId/comments'
})

const {
    find,
    findById,
    create,
    update,
    delete: del
} = require("../controller/comments")

const { checkCommentsExist, checkCommentator } = require("../middleware/checkComments")

router.get('/', find)
router.get('/:id', checkCommentsExist, findById)
router.post('/', auth, create)
router.patch('/:id', auth, checkCommentsExist, checkCommentator, update)
router.delete('/:id', auth, checkCommentsExist, checkCommentator, del)

module.exports = app => {
    app.use(router.routes())
    app.use(router.allowedMethods())
}