const articleModel = require("./../../model/v1/articleModel");
const commentModel = require("./../../model/v1/commentModel");
const categoryModel = require("./../../model/v1/categoryModel");
const { isValidObjectId} = require("mongoose");
const { answer } = require("./commentControl");


exports.create = async (req, res) => {
    const { title, description, body, href, cover, categoryID, creator} = req.body;

    const article = await articleModel.create({
        title,
        description,
        body,
        href,
        cover: req.file.filename,
        categoryID,
        creator,
        publish: 0
    });

    return res.status(201).json({
        message: 'article been made'
    });
};

exports.getAll = async (req, res) => {
    const allArticle = await articleModel.find({ });

    return res.json(allArticle);
};

exports.getOne = async (req, res) => {
    const {href} = req.params;
    const article = await articleModel.findOne({ href: href });

    return res.json(article);
};

exports.getByCategory = async (req, res) => {
    const { href } = req.params;
    const category = await categoryModel.findOne({ href: href});

    if (category) {
        const categoryArticle = await articleModel.find({ 
        categoryID: category._id });
        
        return res.json(categoryArticle);
    }
    else {
        res.json([])
    }

};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { title, description, body, href, categoryID, creator} = req.body;

    const updateArticle = await articleModel.findByIdAndUpdate(
        { _id: id },
        {
        title: title,
        description: description,
        body: body,
        href: href,
        cover: req.file.filename,
        categoryID: categoryID,
        creator: creator,
        }
    );

    return res.json(updateArticle);
};

exports.publish = async (req, res) => {
    const id = req.params.id;

    const isValidArticle = isValidObjectId(id);
    
    
    if (!isValidArticle) {
        return res.status(409).json({
            message: 'Article id is not valid'
        });
    }

    const article = await articleModel.findOneAndUpdate(
        { _id: id },
        { publish: 1 }
    );
    

    return res.json({
        message: 'Article have been published'
    });
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    
    const isValidArticle = isValidObjectId(id);
    
    
    if (!isValidArticle) {
        return res.status(409).json({
            message: 'Article id is not valid'
        });
    }


    const removeArticle = await articleModel.findByIdAndDelete({ _id: id });

    if (!removeArticle) {
        return res.status(404).json({
            message: 'not found'
        });
    }

    return res.json(removeArticle)

};


