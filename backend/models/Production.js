const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
  productionId: { type: String, unique: true },
  orderId: { type: String, required: true },
  employeeId: { type: String, required: true },
  productType: { type: String, required: true },
  size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] },
  color: { type: String },
  targetQuantity: { type: Number, required: true },
  actualQuantity: { type: Number, default: 0 },
  rejectedQuantity: { type: Number, default: 0 },
  rejectionReason: { type: String },
  qualityGrade: { type: String, enum: ['A', 'B', 'C'] },
  machineUsed: { type: String },
  helperAssigned: { type: String },
  startTime: { type: Date },
  endTime: { type: Date },
  breakTimes: [{ start: Date, end: Date, duration: Number }],
  overtimeHours: { type: Number, default: 0 },
  notes: { type: String },
  status: { type: String, enum: ['pending', 'in-progress', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Production', productionSchema);
