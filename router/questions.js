const Router = require("koa-router")

const auth = require('../middleware/auth')
const checkQuestioner = require("../middleware/checkQuestioner")
const checkQuestionExists = require("../middleware/checkQuestionExists")
const { find, 
    findById, 
    create, 
    deleteQuestion,
    update
} = require("../controller/questions")

const router = new Router({
    prefix: '/questions'
})

// 获取全部问题
router.get('/', find)
// 新增问题
router.post('/', auth, create)
// 获取特定问题
router.get('/:id',checkQuestionExists, findById)
// 更新问题
router.patch('/:id', auth, checkQuestionExists, checkQuestioner, update)
// 删除问题
router.delete('/:id', auth, checkQuestionExists, checkQuestioner, deleteQuestion)

module.exports = app => {
    app.use(router.routes())
    app.use(router.allowedMethods())
}