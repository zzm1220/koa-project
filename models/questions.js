const mongoose = require("mongoose")

const { Schema, model } = mongoose

const questionSchema = new Schema({
    _v: {
        type: Number,
        select: false
    },
    title: {
        type: String,
        required: true,
        select: true
    },
    description: {
        type: String,
        required: false
    },
    questioner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        select: false
    },
    topics: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Topic'
            }
        ],
        select: false
    }
})

module.exports = model('Question', questionSchema)