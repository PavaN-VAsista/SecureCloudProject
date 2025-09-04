const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  userEmail: { type: String, index: true },
  action: { type: String, required: true },
  success: { type: Boolean, default: true },
  ip: { type: String },
  timestamp: { type: Date, default: Date.now, index: true },
  meta: { type: mongoose.Schema.Types.Mixed } // For extra data like fileId, error messages, etc.
}, { versionKey: false });

// Add an index for faster searching by user and time
auditLogSchema.index({ userEmail: 1, timestamp: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);