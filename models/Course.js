const { Schema, model, Types: {ObjectId} } = require('mongoose');

const image_pattern = /https?:\/\/./i
const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: [4,'The title must be at least 4 characters long!'],
    },
    description: {
        type: String,
        required: true,
        minlength: [20,'The description must be at least 20 characters long!'],
        maxlength: [50, 'The description must has maximum size of 50 symbols!']
    },
    imgUrl: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return image_pattern.test(v);
            },
            message: 'The image url must start with http or https'
        }
    },
    duration: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    enrolledUsers: {
        type: [ObjectId],
        default: [],
        ref: 'User'
    }
})

courseSchema.index({title: 1}, {
    collation: {
        locale: 'en',
        strength: 2,//case insensitive
    }
})

const Course = model('Course', courseSchema)

module.exports = Course;