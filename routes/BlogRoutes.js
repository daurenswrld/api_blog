const express = require('express');
const BlogPost = require('../models/BlogPost');
const router = express.Router();

// POST /blogs to create a new blog post
router.post('/blogs', async (req, res) => {
    try {
        const newPost = new BlogPost({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET /blogs to retrieve all blog posts
router.get('/blogs', async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /blogs/:id to retrieve a single blog post by ID
router.get('/blogs/:id', async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /blogs/:id to update a blog post by ID
router.put('/blogs/:id', async (req, res) => {
    try {
        const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /blogs/:id to delete a blog post by ID
router.delete('/blogs/:id', async (req, res) => {
    try {
        const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
