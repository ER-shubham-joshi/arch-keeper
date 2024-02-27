const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    role: String,
    scope: {
        type: [String]
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: String,
    theme: {
        type: String,
        default: 'dark'
    },
}, {
    validateBeforeSave: true, // Enable validation before saving
    timestamps: true
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;