const courseModel = require("./../../model/v1/courseModel");
const userModel = require("./../../model/v1/userModel");
const studentModel = require("./../../model/v1/studentModel");
const sessionModel = require("./../../model/v1/sessionModel");
const { isValidObjectId} = require("mongoose");




exports.create = async (req, res) => {
    const {
        name,
        description,
        cover,
        support,
        href,
        price,
        status,
        discount,
        categoryID,
        creator
    } = req.body;

    const course =await courseModel.create({
        name:name,
        description,
        cover: req.file.filename,
        support,
        href,
        price,
        status,
        discount,
        categoryID,
        creator: req.user._id

    });

    const mainCourse = await courseModel
        .findById(course._id)
        .populate('creator', '-password');

    return res.status(201).json(mainCourse)
};

exports.createSession = async (req, res) => {
    const {
        title,
        time,
        free
    } = req.body;
    const {id} = req.params;

    const session = await sessionModel.create({
        title,
        time,
        free,
        video: 'video.mp4',        // req.file.filename
        course: id
    });

    return res.status(201).json(session);
}; 

exports.register = async (req, res) => {
    const isAlreadyRegister = await studentModel.findOne(
        { user: req.user._id,
          course: req.params.id
        }).lean();

    if (isAlreadyRegister) {
        return res.status(409).json({
            message: 'user already registerd'
        });
    }

    const register = await studentModel.create({
        user: req.user._id,
        course: req.params.id,
        price: req.body.price
    });

    return res.status(201).json({
        message: 'you are registered successfully'
    })

};

exports.getall = async (req, res) => {

};

exports.getallSession = async (req, res) => {
    const courseSession = await sessionModel.find({}).populate('course', 'name').lean();

    return res.json(courseSession);
};

exports.getSessionInfo = async (req, res) => {
    const course = await courseModel.findOne({href: req.params.href}).lean();
    const courseSession = await sessionModel.findOne({_id: req.params.sessionID}).lean();

    const allSessions = await sessionModel.find({course: course.id}).lean();

    return res.json({courseSession, allSessions});
};

exports.delete = async (req, res) => {

    const isValidCourse = isValidObjectId(req.params.id);
    
    
    if (!isValidCourse) {
        return res.status(409).json({
            message: 'Course id is not valid'
        });
    }

    const deleteCourse = await sessionModel.findOneAndDelete({
        _id: req.params.id
    });

    if (!deleteCourse) {
        return res.status(404).json({
            message: 'course not found'
        });
    }

    return res.json(deleteCourse)
};

exports.update = async (req, res) => {

};