const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'manager', 'admin'], default: 'employee' },
  department: { type: String },
  designation: { type: String },
  joiningDate: { type: Date },
  dateOfBirth: { type: Date },
  address: { type: String },
  bloodGroup: { type: String },
  emergencyContact: { type: String },
  languagePreference: { type: String, default: 'en' },
  shiftPreference: { type: String },
  skills: [String],
  certifications: [String],
  bankDetails: {
    accountNumber: String,
    bankName: String,
    ifscCode: String
  },
  photoUrl: { type: String },
  status: { type: String, enum: ['active', 'inactive', 'on-leave'], default: 'active' },
  permissions: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
