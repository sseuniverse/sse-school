const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { m } = require("../model");
const { JWT_EXPIRES_IN, JWT_SECRET } = require("../utils")

const User = m.user;

exports.Register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });
  try {
    await user.save();
    const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ accessToken, user });
  } catch (error) {
    res.status(400).json({ error: "Email already exists" });
  }
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
  const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
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

exports.verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { userId: decoded.userId }; // Update this line
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
