const router = require("express").Router();
const { Login, Logout, Register, MyProfile } = require("../controllers/user.controller.js");

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/my-account", MyProfile);

module.exports = router;
