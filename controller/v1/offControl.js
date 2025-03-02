const offModel = require("./../../model/v1/offModel");
const courseModel = require("./../../model/v1/courseModel");
const {isValidObjectId} = require("mongoose");
const { use } = require("../../router/v1/offRoute");


exports.create = async (req, res) => {
    const { code, percent, max, course } = req.body;
    const newOff = await offModel.create({
        code,
        course,
        percent,
        max,
        use: 0,
        creator: req.user._id
    });

    return res.status(201).json(newOff);
};

exports.getAll = async (req, res) => {
    const allOff = await offModel.find({ })
    .find({ }, '-__v')
    .populate('course', 'name href')
    .populate('creator', 'name');

    return res.json(allOff);
};

exports.offOnAll = async (req, res) => {
    const { discount } = req.body;
    const courseOff = await courseModel.updateMany({ discount: discount });

    return res.json({
        message: 'discounts set on all courses'
    });
};

exports.getOne = async (req, res) => {
    const {code} = req.params;
    const {course} = req.body;

    const isValidCourseId = isValidObjectId(course);

    if (!isValidCourseId) {
        return res.status(409).json({
            message: 'course id not valid'
        });
    }

    const off = await offModel.findOne({ code, course });

    if (!off) {
        return res.status(404).json({
            message: 'not found'
        });
    } else if (off.max == off.use) {
        return res.status(409).json({
            message: 'not useable anymore'
        });
    } else {
        await offModel.findOneAndUpdate(
            { code, course },
            { use: off.use + 1 }
        );

        return res.json(off);
    }

    return res.json({
        message: 'you can use it'
    });
};

exports.delete = async (req, res) => {
    const id = req.params.id;

    const isValidOffCode = isValidObjectId(req.params.id);
    
    
    if (!isValidOffCode) {
        return res.status(409).json({
            message: 'OffCode id is not valid'
        });
    }

    const off = await offModel.findOneAndDelete({ _id: id });

    if (!off) {
        return res.status(404).json({
            message: 'offCode not found'
        })
    }

    return res.json(off);
};