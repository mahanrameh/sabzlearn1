const newsModel = require("./../../model/v1/newsModel");


exports.create = async (req, res) => {
    const { email } = req.body;

    const emailValidator = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
      
      if (!emailValidator(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

    const newEmail = await newsModel.create({ email: email });

    return res.status(201).json(newEmail);
};

exports.getAll = async (req, res) => {
    const newsLetter = await newsModel.find({ });

    return res.json(newsLetter);
};