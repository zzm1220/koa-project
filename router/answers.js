const Router = require("koa-router")
const auth = require('../middleware/auth')

const router = new Router({
    prefix: '/questions/:questionId/answers'
})

const { find, 
    findById, 
    create, 
    delete: del,
    update
} = require("../controller/answers")

const { checkAnswerExists, checkAnswerer } = require("../middleware/checkAnswerExists")

router.get('/', find)
router.get('/:id', checkAnswerExists, findById)
router.post('/', auth, create)
router.patch('/:id', auth, checkAnswerExists, checkAnswerer, update)
router.delete('/:id', auth, checkAnswerExists, checkAnswerer, del)

module.exports = app => {
    app.use(router.routes())
    app.use(router.allowedMethods())
}