const mongoose = require("mongoose");

const schema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    percent: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    use: {
        type: Number,
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'course',
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
}, {timestamps: true}
);

const model = mongoose.model('off', schema);

module.exports = model;