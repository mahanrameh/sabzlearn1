const jwt = require("jsonwebtoken");
const userModel = require("./../model/v1/userModel");

module.exports = async (req, res, next) => {
    const authHeader = req.header('Authorization')?.split(' ');

    if (authHeader?.length !== 2) {
        return res.status(403).json({
            message: "you can't access to this route !!!"
        });
    }
    const token = authHeader[1];

    try {

        const jwtPayLoads = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById( jwtPayLoads.id ).lean();

        Reflect.deleteProperty(user, 'password');

        req.user = user;

        next()
    } catch (error) {
        return res.json(error);
    }
}