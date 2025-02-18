// Middleware to check if the user has the required role
const authorize = (roles = []) => {
  return (req, res, next) => {
    // If no roles are specified, allow access to all roles
    if (roles.length && !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient role." });
    }
    next();
  };
};

module.exports = authorize;
