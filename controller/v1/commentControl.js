const commentModel = require("./../../model/v1/commentModel");
const courseModel = require("./../../model/v1/courseModel");
const {isValidObjectId} = require("mongoose");

exports.create = async (req, res) => {
    const { body, courseHref, score } = req.body;
    const course = await courseModel.findOne({ href: courseHref }).lean();

    const comment = await commentModel.create({
        body,
        course: course._id,
        creator: req.user._id,
        score,
        isResponse: 0,
        isAccept: 0
    });

    return res.status(201).json(comment);
};

exports.getAll = async (req, res) => {
    const allComment = await commentModel.find({ })
    .populate('course')
    .populate('creator','-password')
    .lean();

    const newComment = [];

    allComment.forEach(comment => {
        const answerComment = allComment.find(answerComment => 
            String(comment._id) == String(answerComment.mainCommentID)
        );
    
        if (answerComment && comment.isResponse == 0) {
            newComment.push({
                ...comment,
                course: comment.course.name,
                creator: comment.creator.name,
                answerComment: {
                    ...answerComment,
                    course: answerComment.course.name,
                    creator: answerComment.creator.name
                }
            });
            
        } else if (comment.isResponse == 0) {
            newComment.push({
                ...comment,
                course: comment.course.name,
                creator: comment.creator.name
            });
        }
    });

    return res.json(newComment);
};

exports.accept = async (req, res) => {
    const acceptComment = await commentModel.findOneAndUpdate(
        { _id: req.params.id },
        { isAccept: 1 }
    );

    if (!acceptComment) {
        return res.status(404).json({
            message: 'comment not found'
        });
    }

    return res.json(acceptComment);

};

exports.reject = async (req, res) => {
    const rejectComment = await commentModel.findOneAndUpdate(
        { _id: req.params.id },
        { isAccept: 0 }
    );

    if (!rejectComment) {
        return res.status(404).json({
            message: 'comment not found'
        });
    }

    return res.json(rejectComment);
};

exports.answer = async (req, res) => {
    const {body} = req.body;
    const updateComment = await commentModel.findOneAndUpdate(
        { _id: req.params.id },
        { isAccept: 1 }
    );

    if (!updateComment) {
        return res.status(404).json({
            message: 'not found'
        })
    }

    const answerComment = await commentModel.create({
        body,
        course: updateComment.course,
        creator: req.user._id,
        isResponse: 1,
        isAccept: 1,
        mainCommentID: req.params.id
    });

    return res.status(201).json(answerComment);
};

exports.delete = async (req, res) => {
    const isValidComment = isValidObjectId(req.params.id);
    
    if (!isValidComment) {
        return res.status(409).json({
            message: 'Comment id is not valid'
        });
    }

    const deleteComment = await commentModel.findOneAndDelete({ _id: req.params.id });

    if (!deleteComment) {
        return res.status(404).json({
            message: 'comment not found'
        });
    }

    return res.json(deleteComment);
};