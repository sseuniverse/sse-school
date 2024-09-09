const router = require("express").Router();
const {
  Login,
  Logout,
  Register,
  MyProfile,
  DeleteAccount,
} = require("../controllers/user.controller.js");

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/me", MyProfile);
router.post("/delete", DeleteAccount);

module.exports = router;
