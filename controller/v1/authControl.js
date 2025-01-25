const userModel = require("../../model/userModel");

const registerValidator = require("./../../validators/register");

exports.register = async (req, res) => {
    const validatorResult = registerValidator(req.body)
    if (validatorResult !== true) {
        return res.status(422).json(validatorResult);
    }

    const {username, name, email, password, phone} = req.body;

    const isuserExist = await userModel.findOne({
        $or: [{username}, {email}]
    });

    if (isuserExist) {
        return res.status(409).json({
            message: 'user already exist'
        })
    }
};


exports.login = async (req, res) => {

};


exports.getMe = async (req, res) => {

};

