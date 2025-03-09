const courseModel = require("./../../model/v1/courseModel");
const userModel = require("./../../model/v1/userModel");
const studentModel = require("./../../model/v1/studentModel");
const sessionModel = require("./../../model/v1/sessionModel");
const commentModel = require("./../../model/v1/commentModel");
const categoryModel = require("./../../model/v1/categoryModel");
const { isValidObjectId} = require("mongoose");
const { answer } = require("./commentControl");




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

exports.update = async (req, res) => {

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

exports.getAll = async (req, res) => {
    const course = await courseModel.find({ })
    .populate('categoryID', 'title href')
    .populate('creator', 'name email')
    .lean()
    .sort({ _id: -1 });

    const register = await studentModel.find({ })
    .lean();
    const comment = await commentModel.find({ })
    .lean();

    const allCourse = [];

    course.forEach(course => {
        let courseTotalScore = 5;
        const courseRegister = register.filter(
            (register) => register.course.toString() == course._id.toString()
        );

        const courseComment = comment.filter(
            (comment) => { return comment.course.toString() == course._id.toString();
        });

        courseComment.forEach(
            (comment) => (courseTotalScore += Number(comment.score))
        );
                
        allCourse.push({
            ...course,
            categoryID: course.categoryID.title,
            creator: course.creator.name,
            register: courseRegister.length,
            courseScore: Math.floor(courseTotalScore / (courseComment.length + 1))
        });
    });

    
    return res.json(allCourse);
};

exports.getCourse = async (req, res) => {
    const { href } = req.params;
    const category = await categoryModel.findOne({ href: href});

    if (category) {
        const categoryCourse = await courseModel.find({ 
        categoryID: category._id });
        
        return res.json(categoryCourse);
    }
    else {
        res.json([])
    }

};

exports.getCourseInfo = async (req, res) => {
    const { href } = req.params;
    const course = await courseModel.findOne({ href: href })
    .populate('creator', '-password')
    .populate('categoryID');

    const courseStudent = await studentModel.find({ course: course._id }).lean();
    const courseSession = await sessionModel.find({ course: course._id }).lean();
    const courseComment = await commentModel.find({ course: course._id, isAccept: 1 })
    .populate('creator', '-password')
    .populate('course').lean();

    const isUserRegister = !!(await studentModel.findOne({
        user: req.user._id,
        course: course._id
    }));

    let allComment = [];

    courseComment.forEach(comment => {
        const answerComment = courseComment.find(answerComment => 
            String(comment._id) == String(answerComment.mainCommentID)
        );
    
        if (answerComment) {
            allComment.push({
                ...comment,
                course: comment.course.name,
                creator: comment.creator.name,
                answerComment: {
                    ...answerComment,
                    course: answerComment.course.name,
                    creator: answerComment.creator.name
                }
            });
        } else {
            allComment.push({
                ...comment,
                course: comment.course.name,
                creator: comment.creator.name
            });
        }
    });
    


    res.json({course, courseSession, courseComment: allComment, courseStudent, isUserRegister});
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

exports.getRelated = async (req, res) => {
    const {href} = req.params;
    const course = await courseModel.findOne({ href: href });

    if (!course) {
        return res.status(404).json({
            message: 'course not found '
        });
    }

    let relatedCourse = await courseModel.find({ categoryID: course.categoryID });
    relatedCourse = relatedCourse.filter(course => course.href !== href);

    return res.json(relatedCourse)
};

exports.popularCourse = async (req, res) => {
    const courseStudent = await studentModel.find({ }).lean();

    const courseCount = {};
    
    courseStudent.forEach(student => {
        if (courseCount[student.course]) {
            courseCount[student.course]++;
        } else {
            courseCount[student.course] = 1;
        }
    });
    
    
    let popularCourse = null;
    let maxCount = 0;
    
    for (const [course, count] of Object.entries(courseCount)) {
        if (count > maxCount) {
            maxCount = count;
            popularCourse = course;
        }
    }
    
    return res.json({ popularCourse, count: maxCount });
    
};

exports.presellCourse = async (req, res) => {
    const presell = await courseModel.find({ }).lean();
    
    const allPresell = []

    presell.forEach(course => {
        const presellCourse = presell.find(presellCourse =>
            course.status == 'presell'
        );

        if (presellCourse) {
            allPresell.push({...course})
        }
    })

    return res.json(allPresell);
};

exports.deleteCourse = async (req, res) => {
    const isValidCourse = isValidObjectId(req.params.id);
    
    
    if (!isValidCourse) {
        return res.status(409).json({
            message: 'Course id is not valid'
        });
    }

    const deleteCourse = await courseModel.findOneAndDelete({ _id: req.params.id });

    if (!deleteCourse) {
        return res.status(404).json({
            message: 'course not found'
        });
    }
    
    return res.json(deleteCourse)
};

exports.deleteSession = async (req, res) => {

    const isValidSession = isValidObjectId(req.params.id);
    
    
    if (!isValidSession) {
        return res.status(409).json({
            message: 'session id is not valid'
        });
    }

    const deleteSession = await sessionModel.findOneAndDelete({
        _id: req.params.id
    });

    if (!deleteSession) {
        return res.status(404).json({
            message: 'session not found'
        });
    }

    return res.json(deleteSession)
};
