const validator = require("fastest-validator");

const v = new validator();

const schema = {
    name:{
        type: 'string',
        min: 3,
        max: 255
    },
    username:{
        type: 'string',
        min: 3,
        max: 100
    },
    email:{
        type: 'email',
        min: 10,
        max: 100
    },
    phone:{
        type: 'string',
        max: 15
    },
    password:{
        type: 'string',
        min: 8,
        max: 24
    },
    repassword:{
        type: 'equal',
        field: 'password'
    },
    $$strict: true
};


const check = v.compile(schema);

module.exports = check;