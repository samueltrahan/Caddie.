const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    api_id: {
        type: String,
        required: true
    },
    name: String,
    address: String,
    img: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Courses', courseSchema);