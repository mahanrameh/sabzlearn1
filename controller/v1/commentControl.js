const commentModel = require('./../../model/v1/commentModel');
const courseModel = require('./../../model/v1/courseModel');

exports.create = async (req, res) => {
    const { body, courseHref, score } = req.body;
    const course = await courseModel.findOne({ href: courseHref }).lean();

    const comment = await commentModel.create({
        body,
        course: course._id,
        creator: req.user._id,
        score,
        isResponsed: 0,
        isAccept: 0
    });

    return res.status(201).json(comment);
};