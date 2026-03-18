const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
  machineId: { type: String, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  model: { type: String },
  serialNumber: { type: String },
  department: { type: String },
  assignedEmployee: { type: String },
  operatingHours: { type: Number, default: 0 },
  lastServiceDate: { type: Date },
  nextServiceDue: { type: Date },
  maintenanceSchedule: { type: String },
  status: { type: String, enum: ['active', 'under-maintenance', 'broken', 'idle'], default: 'active' },
  performanceRating: { type: Number, default: 100 },
  specifications: {
    power: String,
    speed: String,
    capacity: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Machine', machineSchema);
