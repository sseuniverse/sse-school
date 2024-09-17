const router = require("express").Router();
const { authenticate } = require("../middelware/auth.js");
const {
  createPost,
  getPost,
  getDetailBySlug,
} = require("../controllers/blog.controller.js");

router.post("/", createPost);
router.get("/list", getPost);
router.get("/detail/:slug", getDetailBySlug);

module.exports = router;
