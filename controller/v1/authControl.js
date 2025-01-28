const userModel = require("../../model/v1/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const banUserModel = require("./../../model/v1/ban-phone");

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

    const isUserBan = await banUserModel.find({ phone:phone });

    if (isUserBan.length) {
        return res.status(409).json({
            message: 'this phone number is banned'
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
    const {identifier, password} = req.body;

    const user = await userModel.findOne({
        $or: [{email: identifier}, {username: identifier}]
    });

    if (!user) {
        return res.status(401).json({
            message: 'there is no user with this username or email'
        });
    }
    
    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
        return res.status(401).json({
            message: 'password is not valid'
        });
    }
    
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
        {expiresIn: '60 days'}
    );

    return res.json({ accessToken });
};


exports.getMe = async (req, res) => {

};

