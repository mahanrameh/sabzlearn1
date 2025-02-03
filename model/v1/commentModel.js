const mongoose = require("mongoose");
const { applyTimestamps } = require("./userModel");


const schema = mongoose.Schema({
    body: {
        type: String,
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
    isAccept: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 5
    },
    isResponsed: {
        type: Number,
        default: 0,
        required: true
    },
    mainCommentID: {
        type: mongoose.Types.ObjectId,
        ref: 'comment'
    }
},  {timestamps: true}
);