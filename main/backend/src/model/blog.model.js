const mongoose = require("mongoose");
const { titleToSlug } = require("../utils.js");

const replySchema = new mongoose.Schema(
  {
    userId: String,
    message: String,
    tagUser: String,
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    avatarUrl: String,
    message: String,
    users: [
      {
        id: String,
        name: String,
        avatarUrl: String,
      },
    ],
    replyComment: [replySchema],
  },
  { timestamps: true }
);

const favoritePersonSchema = new mongoose.Schema({
  name: String,
  avatarUrl: String,
});

const blogSchema = new mongoose.Schema(
  {
    publish: { type: Boolean, default: false, required: true },
    metaKeywords: [String],
    content: String,
    comment: Boolean,
    comments: [commentSchema],
    tags: [String],
    metaTitle: { type: String, required: true },
    title: { type: String, required: true },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      // required: true,
    },
    coverUrl: { type: String },
    view: { type: Number, default: 0, required: true },
    share: { type: Number, default: 0, required: true },
    totalComments: { type: Number, default: 0, required: true },
    totalFavorites: { type: Number, default: 0, required: true },
    metaDescription: { type: String, required: true },
    description: { type: String, required: true },
    author: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: String,
      avatarUrl: String,
    },
    favoritePerson: [favoritePersonSchema],
  },
  { timestamps: true }
);

blogSchema.pre("save", async function (next) {
  this.slug = await titleToSlug(this.title, Blog);
  next();
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
