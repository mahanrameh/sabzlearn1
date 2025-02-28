const { text } = require("body-parser");
const contactModel = require("./../../model/v1/contactModel");
const {isValidObjectId} = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.create = async (req, res) => {
    const {name, email, phone, body} = req.body;

    const newContact = await contactModel.create({
        name,
        email,
        phone,
        body,
        isAnswered: 0
    });

    return res.status(201).json(newContact);
};

exports.getAll = async (req, res) => {
    const allContact = await contactModel.find({ });

    return res.json(allContact);
};

exports.answer = async (req, res) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.EMAIL,
            pass: process.env.EMAILPASS
        }
    });

    const mailOption = {
        from: 'mahanrameh7755@gmail.com',
        to: req.body.email,
        subject: 'answer to your text',
        text: req.body.answer
    }

    transporter.sendMail(mailOption, async (error, info) => {
        if (error) {
            return res.json({
                message: error
            });
        } else{
            const contact = await contactModel.findOneAndUpdate(
                { email: req.body.email },
                { isAnswered: 1 }
            );

            return res.json({
                message: 'email send successfully'
            });
        }
    });
};

exports.remove = async (req, res) => {
    const isValidID = isValidObjectId(req.params.id);
         
    if (!isValidID) {
        return res.status(409).json({
             message: 'id is not valid'
         });
    }
    
    const deleteContact = await contactModel.findOneAndDelete({ _id: req.params.id });

    if (!deleteContact) {
        return res.status(404).json({
            message: 'not found'
        });
    }

    return res.json(deleteContact);
};