const User = require('../models/User');
const Post = require('../models/Post');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        //check if user have access to this
        if (user.id !== req.auth.id) {
            return res.status(403).json({message: "Unauthorized"});
        }
        res.status(200).json(user.toJSON());
    } catch (e) {
        console.error(e)
        res.status(500).json({message: 'Internal Server Error'});
    }
}
