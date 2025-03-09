const menuModel = require("./../../model/v1/menuModel");
const {isValidObjectId} = require("mongoose");


exports.create = async (req, res) => {
    const { title, href, parent } = req.body;

    const isValidparent = isValidObjectId(parent);
    
    
    if (!isValidparent) {
        return res.status(409).json({
            message: 'parent id is not valid'
        });
    }

    const menu = await menuModel.create({
        title, href, parent
    });

    return res.status(201).json(menu);
};

exports.getAll = async (req, res) => {
    const allMenu = await menuModel.find({ })
    .lean();

    allMenu.forEach(menu => {
        const subMenu = []
        for (let i = 0; i < allMenu.length; i++) {
            const mainMenu = allMenu[i]
            if (String(mainMenu.parent) == String(menu._id)) {
                subMenu.push(allMenu.splice(i, 1)[0]);
                i = i - 1;
            }
        }

        menu.subMenu = subMenu;
    });

    return res.json(allMenu);
};

exports.getAllPanel = async (req, res) => {
    const menu = await menuModel.find({ })
    .populate('parent', 'title')
    .lean();

    return res.json(menu);
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    const isValidMenu = isValidObjectId(id);
    
    
    if (!isValidMenu) {
        return res.status(409).json({
            message: 'Menu id is not valid'
        });
    }

    const deleteMenu = await menuModel.findOneAndDelete({ _id: id });

    if (!deleteMenu) {
        return res.status(404).json({
            message: 'menu not found'
        });
    }

    return res.json(deleteMenu);
};