const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Decoded JWT:', decoded); // Debug log
    req.user = decoded;
    next();
  } catch (err) {
    console.error('❌ JWT verification failed:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { authenticateUser };