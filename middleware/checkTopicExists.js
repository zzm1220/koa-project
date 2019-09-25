const Topic = require("../models/topics")

const checkTopicExists = async (ctx, next) => {
    const topicId = ctx.params.id
    const topic = await Topic.findById(topicId)
    if (!topic) ctx.throw('404', '话题不存在')
    await next()
}

module.exports = checkTopicExists