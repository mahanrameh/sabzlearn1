const mongoose = require("mongoose");
const { answer } = require("../../controller/v1/commentControl");


const schema = mongoose.Schema({
    departmentID: {
        type: mongoose.Types.ObjectId,
        ref: 'department',
        required: true
    },
    subDepartmentID: {
        type: mongoose.Types.ObjectId,
        ref: 'sub_department',
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    answer:{
        type: Number,
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'course',
        required: false
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: 'ticket',
        required: false
    },
    isAnswer: {
        type: Number,
        required: true
    }
}, {timestamps: true}
);



const model = mongoose.model('ticket', schema);

module.exports = model;