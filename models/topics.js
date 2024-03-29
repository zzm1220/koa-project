const mongoose = require('mongoose')

const { Schema, model } = mongoose

const topicSchema = new Schema({
    __v: {
        type: Number, 
        select: false
    },
    name: {
        type: String,
        required: true
    },
    avatar_url: {
        type: String,
        required: false
    },
    intro: {
        type: String,
        select: false
    }
}, { timestamps: true})

module.exports = model('Topic', topicSchema)