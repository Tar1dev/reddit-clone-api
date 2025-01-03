const User = require('../models/user');
const bcrypt = require('bcrypt');
const { newJWT } = require('../helpers');


exports.register = async (req, res) => {
    // check if user is already registered
    try {
        const existingUser = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        // hash password
        const hash = await bcrypt.hash(req.body.password, 10);

        // save user to the database
        const newUser = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: hash
        })

        // sign a new jwt
        const token = newJWT({id: newUser.id});

        res.status(201).json({
            ...newUser.toJSON(),
            token: token
        });
    } catch (e) {
        res.status(500).json({message: "Internal Server Error"});
        console.error(e);
    }
}

exports.login = async (req, res) => {
    try {
        // check if the user exists
        const user = await User.scope('withPassword').findOne({
            where: {
                email: req.body.email
            }
        })
        if (!user) {
            return res.status(400).json({message: "Wrong email or password"});
        }

        // compare passwords
        const doesPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!doesPasswordMatch) {
            return res.status(400).json({message: "Wrong email or password"});
        }

        // sign a new JWT
        const token = newJWT({id: user.id});
        console.log(token)

        res.status(200).json({message: "Authenticated successfully.", token: token});
    } catch (e) {
        res.status(500).json({message: "Internal Server Error"});
        console.error(e)
    }
}