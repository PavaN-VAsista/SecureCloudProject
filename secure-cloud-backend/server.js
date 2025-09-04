const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();
console.log('🔌 .env loaded');

// DB connection
connectDB();
console.log('🧠 DB connection function called');

// Init express
const app = express();
app.use(cors({
  exposedHeaders: ['Content-Disposition'],
}));
app.use(express.json());

console.log('🚀 Middleware initialized');

// Test route
app.get('/test', (req, res) => {
  res.json({ message: "Server is working ✅" });
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);

const roleRoutes = require('./routes/roles');
app.use('/api/roles', roleRoutes);

app.use('/api/share', require('./routes/share'));

// ✅ ADD THIS LINE TO REGISTER THE AUDIT LOG ROUTE
app.use('/api/audit-log', require('./routes/auditLog'));

console.log('📡 Routes mounted');

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));