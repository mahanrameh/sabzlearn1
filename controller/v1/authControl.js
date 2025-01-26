const userModel = require("../../model/v1/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config()

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
        });
    }

    const countOfUser = await userModel.countDocuments()

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        email,
        username,
        name,
        phone,
        password: hashedPass,
        role: countOfUser > 0 ? "USER" : "ADMIN"
    });

    const userObject = user.toObject()
    Reflect.deleteProperty(userObject, 'password')

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "60 days" });

    return res.status(201).json({ user:userObject, accessToken })

};


exports.login = async (req, res) => {

};


exports.getMe = async (req, res) => {

};

