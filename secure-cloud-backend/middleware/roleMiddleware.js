// middleware/roleMiddleware.js

module.exports = (permission) => {
  return (req, res, next) => {
    try {
      const roles = req.user.roles || [];

      const hasPermission = roles.some(role => {
        // Object-based roles (e.g., { name: "editor", upload: true })
        if (typeof role === 'object' && role !== null) {
          return role[permission] === true;
        }

        // String-based fallback role
        if (typeof role === 'string') {
          return role === 'admin'; // Admin bypasses all checks
        }

        return false;
      });

      if (!hasPermission) {
        return res.status(403).json({ message: `❌ Access denied: Missing ${permission} permission` });
      }

      next();
    } catch (err) {
      console.error("❌ RBAC middleware error:", err.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};