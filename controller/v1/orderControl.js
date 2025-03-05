const studentModel = require("./../../model/v1/studentModel");



exports.getAll = async (req, res) => {
    const order = await studentModel.find({ user: req.user._id })
        .populate('course', 'name href')
        .lean();

    return res.json(order);
};

exports.getOne = async (req, res) => {
    const { id } = req.params;

    const isValidOrder = isValidObjectId(id);
    
    
    if (!isValidOrder) {
        return res.status(409).json({
            message: 'Order id is not valid'
        });
    }

    const order = await studentModel.findOne({ _id: id })
    .populate('course', 'name href')
    .lean();

    if (!order) {
        return res.status(404).json({
            message: 'there is no such an order'
        });
    }

    return res.json(order);
};