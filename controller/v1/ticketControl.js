const ticketModel = require("./../../model/v1/ticketModel");
const departmentModel = require("./../../model/v1/departmentModel");
const sub_departmentModel = require("./../../model/v1/subDepartmentModel");




exports.create = async (req, res) => {
    const {
        departmentID,
        subDepartmentID,
        priority,
        title,
        body,
        course
    } = req.body;

    const ticket = await ticketModel.create({
        departmentID,
        subDepartmentID,
        priority,
        title,
        body,
        course,
        user: req.user._id,
        answer: 0,
        isAnswer: 0
    });

    const mainTicket = await ticketModel.findOne({ _id: ticket._id })
    .populate('departmentID', 'title')
    .populate('subDepartmentID', 'title')
    .lean();

    return res.status(201).json(mainTicket);
};

exports.getAll = async (req, res) => {
    const allTicket = await ticketModel.find({ answer: 0 })
    .populate('departmentID', 'title')
    .populate('subDepartmentID', 'title')
    .populate('user', 'username')
    .lean();

    return res.json(allTicket);
};

exports.userTicket = async (req, res) => {
    const ticket = await ticketModel.find({ user: req.user._id })
    .sort({ _id: -1 })
    .populate('departmentID', 'title')
    .populate('subDepartmentID', 'title')
    .populate('user', 'username')
    .lean();

    return res.json(ticket)
};

exports.department = async (req, res) => {
    const allDepartment = await departmentModel.find({ });

    return res.json(allDepartment);
};

exports.sub_department = async (req, res) => {
    const { id } = req.params;
    const allSub = await sub_departmentModel.find({ parent: id });

    return res.json(allSub);
};

exports.setAnswer = async (req, res) => {
    const { body, ticketID } = req.body;

    const ticket = await ticketModel.findOne({ _id: ticketID })
    .lean();
    const answer = await ticketModel.create({
        title: 'your answer',
        body,
        parent: ticketID,
        priority: ticket.priority,
        user: req.user._id,
        isAnswer: 1,
        answer: 0,
        departmentID: ticket.departmentID,
        subDepartmentID: ticket.subDepartmentID
    });

    await ticketModel.findOneAndUpdate(
        { _id: ticketID },
        { answer: 1 }
    );

    return res.status(201).json(answer);
};

exports.getAnswer = async (req, res) => {
    const { id } = req.params;

    const ticket = await ticketModel.findOne({ _id: id });
    const ticketAnswer = await ticketModel.findOne({ parent: id });

    return res.json({ticket, ticketAnswer});
};

exports.createDepartment = async (req, res) => {
    const { title } = req.body;

    const department = await departmentModel.create({ title: title });

    return res.status(201).json(department);
};

exports.createSubDepartment = async (req, res) => {
    const { title, parent} = req.body;

    const sub_department = await sub_departmentModel.create({
         title: title,
         parent: parent
        });

    return res.status(201).json(sub_department);
};

