const courseModel = require("./../../model/v1/courseModel");


exports.getResult = async (req, res) => {
    const { keyword } = req.params;
    const course = await courseModel.find({
        $or: [
            { name: { $regex: ".*" + keyword + ".*", $options: 'i' } },
            { description: { $regex: ".*" + keyword + ".*", $options: 'i' } }
        ]
    });
    

    return res.json(course);
};