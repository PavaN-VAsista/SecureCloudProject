const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log('🛂 Login attempt:', email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Password mismatch for user:', email);
      return res.status(401).json({ message: 'Invalid password' });
    }

    // ✅ Token expiration time increased to 8 hours for development
    const token = jwt.sign(
      { userId: user._id, email: user.email, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    console.log('✅ Login successful:', email);

    res.json({
      token,
      email: user.email,
      roles: user.roles,
    });
  } catch (err) {
    console.error('❌ Server error during login:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};