const mongoose = require("mongoose");


const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isAnswered: {
        type: Number,
        required: true
    },
    body: {
        type: String,
        required: true
    },
}, {timestamps: true}
);

const model = mongoose.model('contact',schema);

module.exports = model;