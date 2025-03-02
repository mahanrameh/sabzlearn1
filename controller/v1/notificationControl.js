const notificationModel = require("./../../model/v1/notificationModel");
const {isValidObjectId} = require("mongoose");



exports.create = async (req, res) => {
    const { message, admin } = req.body;

    const isValidAdmin = isValidObjectId(req.body.admin);
    
    
    if (!isValidAdmin) {
        return res.status(409).json({
            message: 'admin id is not valid'
        });
    }


    const notification = await notificationModel.create({
        message: message,
        admin: admin
    });

    return res.status(201).json(notification);
};

exports.getAll = async (req, res) => {
    const notification = await notificationModel.find({ });

    return res.json(notification);
};

exports.getMessage = async (req, res) => {
    const { _id } = req.user;

    const adminNotification = await notificationModel.find({ admin: _id });

    return res.json(adminNotification);
};

exports.seenMessage = async (req, res) => {
    const id = req.params.id;

    const isValidNotification = isValidObjectId(id);
    
    
    if (!isValidNotification) {
        return res.status(409).json({
            message: 'Notification id is not valid'
        });
    }

    const notification = await notificationModel.findOneAndUpdate(
        { _id: id },
        { seen: 1 }
    );
    

    return res.json({
        message: 'notification have been seen'
    });
};

exports.deleteMessage = async (req, res) => {
    const id = req.params.id;

    const isValidNotification = isValidObjectId(id);
    
    
    if (!isValidNotification) {
        return res.status(409).json({
            message: 'Notification id is not valid'
        });
    }

    const notification = await notificationModel.findOneAndDelete({ _id: id });

    if (!notification) {
        return res.status(404).json({
            message: 'notification not found'
        })
    }

    return res.json(notification);
};