// createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

// Example usage: node createAdmin.js recipient@example.com password123
const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error('❌ Error: Please provide an email and password.');
  console.log('Usage: node createAdmin.js <email> <password>');
  process.exit(1);
}

console.log('🚀 Connecting to MongoDB...');

const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      console.log(`ℹ️ User with email "${email}" already exists. Skipping creation.`);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // ✅ CORRECTED: Provide the role as a simple string in an array
    const userRoles = ['user'];

    await User.create({
      email: email,
      password: hashedPassword,
      roles: userRoles, 
    });

    console.log(`✅ User "${email}" created successfully!`);

  } catch (error) {
    console.error('❌ Error creating user:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
  }
};

createUser();