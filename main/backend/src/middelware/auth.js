const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils")

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
