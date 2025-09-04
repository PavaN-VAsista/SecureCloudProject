const express = require('express');
const { addRole, getRoles } = require('../controllers/roleController');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware'); // you already have this

// POST /api/roles
router.post('/', authenticateUser, addRole);

// GET /api/roles
router.get('/', authenticateUser, getRoles);

module.exports = router;