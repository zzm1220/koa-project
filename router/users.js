const Router = require('koa-router')

const userRouter = new Router({
    prefix: '/users'
})

const auth = require('../middleware/auth')
const checkOwner = require('../middleware/checkOwner')
const checkUserExists = require('../middleware/checkUserExists')
const checkTopicExists = require('../middleware/checkTopicExists')
const { checkAnswerExists }  = require('../middleware/checkAnswerExists')
const { 
    find, 
    findById, 
    create, 
    update, 
    deleteUser,
    login,
    listFollowing,
    follow,
    unfollow,
    listFollowers,
    followTopic,
    unfollowTopic,
    listFollowTopics,
    listQuestions,
    listLikingAnswers,
    likeAnswer,
    unlikeAnswer,
    listDislikingAnswers,
    dislikeAnswer,
    undislikeAnswer,
    listCollectingAnswer,
    collectAnswer,
    unCollectAnswer
} = require('../controller/users')
// 查找用户列表
userRouter.get('/', find)

// 查找特定用户
userRouter.get('/:id', findById)

// 查找用户关注
userRouter.get('/:id/following', listFollowing)

// 关注某人
userRouter.put('/following/:id', auth, checkUserExists, follow)

// 取消关注某人
userRouter.delete('/following/:id', auth, checkUserExists, unfollow)

// 获取某人粉丝列表
userRouter.get('/:id/followers', listFollowers)

// 新建用户
userRouter.post('/', create)

// 修改用户
userRouter.patch('/:id', auth, checkOwner, update)

// 删除用户
userRouter.delete('/:id', auth, checkOwner, deleteUser)

// 用户登录
userRouter.post('/login', login)

// 用户关注话题
userRouter.put('/topics/:id', auth, checkTopicExists, followTopic)

// 取消关注话题
userRouter.delete('/topics/:id', auth, checkTopicExists, unfollowTopic)

// 获取用户关注的话题
userRouter.get("/:id/listFollowTopics", listFollowTopics)

// 获取用户的提问
userRouter.get("/:id/questions", listQuestions)

// 获取用户喜欢的答案列表
userRouter.get("/:id/likeAnswers", listLikingAnswers)

// 用户对答案点赞
userRouter.put("/likeAnswers/:id", auth, checkAnswerExists, likeAnswer, undislikeAnswer)

// 用户对答案取消点赞
userRouter.delete("/likeAnswers/:id", auth, checkAnswerExists, unlikeAnswer)

//获取用户踩的答案列表
userRouter.get("/:id/dislikeAnswers", listDislikingAnswers)

//用户对答案进行踩
userRouter.put("/dislikeAnswers/:id", auth, checkAnswerExists, dislikeAnswer, unlikeAnswer)

//用户对答案取消踩
userRouter.delete("/dislikeAnswers/:id", auth, checkAnswerExists, undislikeAnswer)

//展示用户收藏答案
userRouter.get("/:id/collectingAnswer", listCollectingAnswer) 

// 用户收藏答案
userRouter.put("/collectingAnswer/:id", auth, checkAnswerExists, collectAnswer)

// 用户取消收藏答案
userRouter.delete("/collectingAnswer/:id", auth, checkAnswerExists, unCollectAnswer)

module.exports = app => {
    app.use(userRouter.routes())
    app.use(userRouter.allowedMethods())
}