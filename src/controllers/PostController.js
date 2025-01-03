const Post = require('../models/Post');

exports.createNewPost = async (req, res) => {
    const post = await Post.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.auth.id,
    });
    res.status(201).json(post);
}

exports.getAllPosts = async (req, res) => {
    try {
        // check if user filter is present
        let posts;
        const userId = parseInt(req.query.userId);
        if (userId) {
            posts = await Post.findAll({
                where: {
                    userId: userId
                }
            });
        } else {
            posts = await Post.findAll();
        }

        res.status(200).json(posts);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.getPostById = async (req, res) => {
    const post = await Post.findOne({
        where: {
            id: req.params.id
        }
    });

    res.status(200).json(post);
}