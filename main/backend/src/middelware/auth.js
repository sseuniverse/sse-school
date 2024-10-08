const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../utils");

exports.generateToken = (user) => {
  return jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

/**
 * Authenticate
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
exports.authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        message: "Authorization token missing",
      });
    }
    // console.log(authorization);
    const accessToken = authorization.split(" ")[1];
    const data = jwt.verify(accessToken, JWT_SECRET);
    req.userId = data.userId;
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

// exports.verifyToken = async (req, res, next) => {
//   const token = req.headers["x-access-token"];
//   if (!token) {
//     return res.status(401).json({ error: "No token provided" });
//   }
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = { userId: decoded.userId }; // Update this line
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };
