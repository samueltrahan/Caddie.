const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: String,
    rating: {type: Number, min: 1, max: 5, default: 5}
} , {
    timestamps: true
});

const courseSchema = new Schema({
    api_id: {
        type: String,
        required: true
    },
    name: String,
    address: String,
    img: String,
    reviews: [reviewSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Courses', courseSchema);