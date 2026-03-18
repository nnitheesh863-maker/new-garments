const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  leaveId: { type: String, unique: true },
  employeeId: { type: String, required: true },
  leaveType: { type: String, enum: ['sick', 'casual', 'earned', 'maternity', 'paternity', 'unpaid'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String },
  documentUrl: { type: String },
  substituteEmployee: { type: String },
  handoverNotes: { type: String },
  emergencyContact: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  approvedBy: { type: String },
  approvedDate: { type: Date },
  rejectionReason: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Leave', leaveSchema);
