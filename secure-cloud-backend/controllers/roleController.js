const Role = require('../models/Role');

const addRole = async (req, res) => {
  const { name, upload, download, revoke } = req.body;

  try {
    const role = new Role({ name, upload, download, revoke });
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save role' });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
};

module.exports = { addRole, getRoles };