const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: String,
    email: String,
    avatar: String,
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses'
    }],
    googleId: String,
}, {
    timestamps: true
});

module.exports= mongoose.model('User', userSchema)