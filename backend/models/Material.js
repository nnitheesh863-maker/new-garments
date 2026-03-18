const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  materialId: { type: String, unique: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['fabric', 'thread', 'button', 'zipper', 'label', 'packaging', 'other'], required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, enum: ['meters', 'pieces', 'kg', 'rolls', 'boxes'], default: 'pieces' },
  qualityGrade: { type: String, enum: ['A', 'B', 'C'], default: 'A' },
  batchNumber: { type: String },
  supplier: { type: String },
  costPerUnit: { type: Number },
  storageLocation: { type: String },
  expiryDate: { type: Date },
  minStockLevel: { type: Number, default: 0 },
  currentStock: { type: Number, default: 0 },
  allocatedStock: { type: Number, default: 0 },
  status: { type: String, enum: ['available', 'low-stock', 'out-of-stock'], default: 'available' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Material', materialSchema);
