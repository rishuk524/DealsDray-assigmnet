const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Remove "Bearer " if present
  console.log("Token received: ", token); // Log the token for debugging

  if (!token) {
    return res.status(403).json({ message: "Access denied, token missing!" });
  }

  try {
    const decoded = jwt.verify(token, "secret-key");
    req.admin = decoded;
    next();
  } catch (error) {
    console.error("JWT Error: ", error); // Log any JWT verification errors
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
module.exports = authenticate;  