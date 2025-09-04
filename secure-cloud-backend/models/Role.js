const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  upload: { type: Boolean, default: false },
  download: { type: Boolean, default: false },
  revoke: { type: Boolean, default: false },
});

module.exports = mongoose.model('Role', roleSchema);