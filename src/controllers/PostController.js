const Post = require('../models/Post');

exports.createNewPost = async (req, res) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.auth.id,
        });
        res.status(201).json(post);
    } catch (e) {
        console.error(e)
        res.status(500).json({message: 'Internal Server Error'});
    }
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
    try {
        const post = await Post.findByPk(req.params.id);

        res.status(200).json(post);
    } catch (e) {
        console.error(e)
        res.status(500).json({message: 'Internal Server Error'});
    }
}

exports.deletePostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id)
        if (!post) {
            return res.status(404).json({message: "Post not found"});
        }

        // check if the post is user's one
        if (req.auth.id !== post.userId) {
            return res.status(403).json({message: "Unauthorized"});
        }

        await post.destroy()
        res.status(200).json({message: "Post Sucessfully deleted"});
    } catch (e) {
        console.error(e)
        res.status(500).json({message: 'Internal Server Error'});
    }
}

exports.updatePostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({message: "Post not found"});
        }

        // check if the post is user's one
        if (req.auth.id !== post.userId) {
            return res.status(403).json({message: "Unauthorized"});
        }

        const updatedPost = await post.update({
            title: req.body.title || post.title,
            content: req.body.content || post.content,
            author: req.body.author || post.author,
        });

        res.status(200).json(updatedPost);
    } catch (e) {
        console.error(e)
        res.status(500).json({message: 'Internal Server Error'});
    }
}
