const categoryModel = require("./../../model/v1/categoryModel");
const { isValidObjectId} = require("mongoose");


exports.create = async (req, res) => {
    const {title, href} = req.body;

    const isCatExist = await categoryModel.findOne({
        $or: [{title}, {href}]
    });

    if (isCatExist) {
        return res.status(409).json({
            message: 'category already exist'
        });
    }


    const category = await categoryModel.create({title, href});

    return res.status(201).json(category)
};

exports.getAll = async (req, res) => {
    const categories = await categoryModel.find({});
    return res.json(categories);
};

exports.remove = async (req, res) => {
        const isValidCategory = isValidObjectId(req.params.id);
        
        
        if (!isValidCategory) {
            return res.status(409).json({
                message: 'category id is not valid'
            });
        }

        const removeCategory = await categoryModel.findByIdAndDelete({ _id: req.params.id });

        if (!removeCategory) {
            return res.status(404).json({
                message: 'no category found'
            });
        }
    
        return res.status(200).json({
            message: 'category got removed'
        });
};

exports.update = async (req, res) => {
    const {title, href} = req.body;

    const category = await categoryModel.findByIdAndUpdate(
        { _id:req.params.id },
        {title:title, href:href}
    ).lean();
    return res.json(category)
};