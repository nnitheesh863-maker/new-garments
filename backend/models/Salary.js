const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  salaryId: { type: String, unique: true },
  employeeId: { type: String, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  basePay: { type: Number, required: true },
  overtimePay: { type: Number, default: 0 },
  incentiveBonus: { type: Number, default: 0 },
  performanceBonus: { type: Number, default: 0 },
  attendanceBonus: { type: Number, default: 0 },
  totalEarnings: { type: Number, default: 0 },
  deductions: {
    tax: { type: Number, default: 0 },
    providentFund: { type: Number, default: 0 },
    insurance: { type: Number, default: 0 },
    loan: { type: Number, default: 0 },
    advances: { type: Number, default: 0 },
    penalties: { type: Number, default: 0 }
  },
  netPay: { type: Number, default: 0 },
  paymentStatus: { type: String, enum: ['pending', 'processed', 'paid'], default: 'pending' },
  paidDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Salary', salarySchema);
