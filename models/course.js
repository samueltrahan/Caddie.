const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    score: {
        type: Number,
        min: 50,
        max: 130,
    }
}, {
    timestamps: true
})

const reviewSchema = new Schema({
    content: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    }
}, {
    timestamps: true
});

const courseSchema = new Schema({
    courseId: {
        type: String,
    },
    name: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    score: [scoreSchema],
    reviews: [reviewSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Courses', courseSchema);