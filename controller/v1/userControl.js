const userModel = require("../../model/v1/userModel");
const banUserModel = require("../../model/v1/ban-phone");




exports.banUser = async (req, res) => {
    const mainUser = await userModel.findOne({ _id:req.params.id }).lean();
    const banUserResult = banUserModel.create({ phone: mainUser.phone });

    if (banUserModel) {
        return res.status(200).json({
            message:'user got banned'
        });
    }
    return res.status(500).json({
        message:'server error'
    });
};
