const mongoose = require("mongoose");


const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    cover: {
        type: String
    },
    categoryID: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    publish: {
        type: Number,
        required: true
    }
}, {timestamps: true}
);


const model = mongoose.model('article', schema);

module.exports = model;