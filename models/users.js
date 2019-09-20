const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
    __v: {
        type: Number,
        select: false
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar_url: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
        default: 'male'
    },
    headline: {
        type: String
    },
    locations: {
        type: [{
            type: String
        }]
    },
    business: {
        type: String
    },
    employments: {
        type: [{
            compony: {type: String},
            job: {type: String}
        }]
    },
    educations: {
        type: [{
            school: {type: String},
            major: {type: String},
            diploma: {type: Number, enum: [1, 2, 3, 4, 5]},
            entrnce_year: {type: Number},
            graduaction_year: {type: Number}
        }]
    }
})

module.exports = model('User', userSchema)