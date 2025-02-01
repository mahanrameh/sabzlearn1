const userModel = require("../../model/v1/userModel");
const banUserModel = require("../../model/v1/ban-phone");
const { isValidObjectId} = require("mongoose");
const bcrypt = require("bcrypt");




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

exports.getAll = async (req, res) => {
    const users = await userModel.find({}).select('-password').lean();

    return res.json(users);
};

exports.removeUser = async (req, res) => {
    
    const isValidUser = isValidObjectId(req.params.id);
    
    
    if (!isValidUser) {
        return res.status(409).json({
            message: 'user id is not valid'
        });
    }

    const removeUser = await userModel.findByIdAndDelete({ _id: req.params.id });

    if (!removeUser) {
        return res.status(404).json({
            message: 'no user found'
        });
    }

    return res.status(200).json({
        message: 'user got removed'
    });
};

exports.changeRole = async (req, res) => {
    const {id} = req.body;

    const isValidUser = isValidObjectId(req.body);
    
    
    if (!isValidUser) {
        return res.status(409).json({
            message: 'user id is not valid'
        });
    }

    const user = await userModel.findOne({ _id: id });
    
    let newRole = user.role == 'ADMIN' ? 'USER' : 'ADMIN';

   const updateUser = await userModel.findByIdAndUpdate(
    { _id: id },
    { role: newRole }
   );


   if (updateUser) {
    return res.json({
        message: 'user role changed successfully'
    });
   }
};

exports.updateUser = async (req, res) => {
    const {name, username, email, password, phone} = req.body

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.findByIdAndUpdate(
       {_id: req.user._id},
       { name:name,
         username:username,
         email:email,
         password:hashedPassword,
         phone:phone   
       }
    ).select('-password').lean();


    return res.json(user)
}