const mongoose = require("mongoose")
const { Schema, model} = require('mongoose')

const commentsSchema = new Schema({
    __v: {type: Number, select: false},
    comment: {type: String, required: true},
    commentator: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    questionId: {type: String, required: true},
    answerId: {type: String, required: true},
    rootCommentId:{ type: String, required: false},
    replyTo: {type: Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true })

module.exports = model('Comments', commentsSchema)