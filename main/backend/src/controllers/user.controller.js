const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { m } = require("../model");
const { JWT_EXPIRES_IN, JWT_SECRET } = require("../utils");
// const requestIp = require("request-ip");
const { generateToken } = require("../middelware/auth.js");
const User = m.user;

exports.Register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const displayName = `${firstName} ${lastName}`;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hashedPassword,
    displayName,
  });
  await user.save();
  const accessToken = generateToken(user);
  res.json({ accessToken, user });
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: "Invalid password" });
  }
  const accessToken = generateToken(user);
  res.json({ accessToken, user });
};

exports.MyProfile = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: "Authorization token missing",
    });
  }
  // console.log(authorization);
  const accessToken = authorization.split(" ")[1];
  const data = jwt.verify(accessToken, JWT_SECRET);
  const userId = data.userId;
  const user = await User.findById(userId);
  res.json({ user });
};

exports.Logout = async (req, res) => {
  req.logout();
  res.json({ message: "Logged out successfully" });
};

exports.DeleteAccount = async (req, res) => {
  const { authorization } = req.headers;
  const { email, password } = req.body;
  if (!authorization) {
    return res.status(401).json({
      message: "Authorization token missing",
    });
  }
  // console.log(authorization);
  const accessToken = authorization.split(" ")[1];
  const data = jwt.verify(accessToken, JWT_SECRET);
  const userId = data.userId;
  const uid = await User.findOne({ email: email });
  const isValidPassword = await bcrypt.compare(password, uid.password);
  if (uid._id === userId) {
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }
    User.findByIdAndDelete(userId);
    res.status(200).json("Account Deleted Successfully");
  } else {
    res.status(401).json("Account Deleted Successfully");
  }
};
