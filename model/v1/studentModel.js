const mongoose = require("mongoose");



const schema = mongoose.Schema({
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'course',
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},  {timestamps: true}
);

const model = mongoose.model('student', schema);

module.exports = model;