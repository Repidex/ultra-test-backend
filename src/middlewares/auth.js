const jwt = require("jsonwebtoken");
const secret = "@$G#DDFS#$c#fdgdfg#FF"; // Replace with your actual secret

// Middleware to check if user is authenticated
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secret); // Verify the token
    req.user = decoded; // Attach decoded token (user info) to the request
    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authenticate;
