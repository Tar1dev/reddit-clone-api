const User = require('../models/User');
const Post = require('../models/Post');

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
}

exports.getUserById = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    })

    if (!user) {
        return res.status(404).json({message: "User not found"});
    }

    //check if user have access to this
    if (user.id !== req.auth.id) {
        return res.status(403).json({message: "Unauthorized"});
    }
    res.status(200).json(user.toJSON());
}
