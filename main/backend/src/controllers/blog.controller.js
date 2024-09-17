const Article = require("../model/blog.model.js");

/**
 * Get all schools
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getPost = async (req, res) => {
  try {
    const posts = await Article.find().exec();
    res.json({ posts: posts });
  } catch (err) {
    res.status(500).json({ message: `[Error]: ${err}` });
  }
};

/**
 * Get a single school by Slug
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getDetailBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const article = await Article.findOne({ slug });
    if (!article) {
      res.status(404).json({ message: "Post Not Found" });
    } else {
      article.totalViews += 1;
      await article.save();
      res.status(200).json({ article });
    }
  } catch (err) {
    res.status(500).json({ message: `[Error]: ${err}` });
  }
};

/**
 * Create a new post
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createPost = async (req, res) => {
  try {
    const newPost = new Article(req.body);
    await newPost.save();
    res
      .status(200)
      .json({ message: "Class created successfully", post: newPost });
  } catch (err) {
    res.status(500).json({ message: `[Error]: ${err}` });
  }
};

/**
 * Update a post
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updatePost = async (req, res) => {
  try {
    const slug = req.params.slug;
    const article = await Article.findOne({ slug });
    if (!article) {
      res.status(404).json({ message: "Post Not Found" });
    }
    const updateArticle = await Article.findByIdAndUpdate(
      article._id,
      req.body,
      { new: true }
    );
    if (!updateArticle) {
      res.status(404).json({ message: "School not found" });
    } else {
      res.status(200).json(updateArticle);
    }
  } catch (err) {
    res.status(500).json({ message: `[Error]: ${err}` });
  }
};
