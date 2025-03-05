const mongoose = require("mongoose");


const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: 'department'
    }
}, {timestamps: true}
);



const model = mongoose.model('sub_department', schema);

module.exports = model;