import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ProductionEntry = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    orderId: '',
    productType: '',
    size: 'M',
    color: '',
    targetQuantity: '',
    actualQuantity: 0,
    rejectedQuantity: 0,
    qualityGrade: 'A',
    machineUsed: '',
    overtimeHours: 0,
    notes: ''
  });
  const [entries, setEntries] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/production`, {
        ...formData,
        employeeId: user.employeeId,
        status: 'completed'
      });
      setEntries([...entries, response.data]);
      setFormData({
        orderId: '',
        productType: '',
        size: 'M',
        color: '',
        targetQuantity: '',
        actualQuantity: 0,
        rejectedQuantity: 0,
        qualityGrade: 'A',
        machineUsed: '',
        overtimeHours: 0,
        notes: ''
      });
      alert('Production entry saved successfully!');
    } catch (error) {
      alert('Error saving production entry');
    }
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4">Production Entry</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="dashboard-card">
            <h5>Daily Production Entry</h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Order Number</label>
                  <input type="text" name="orderId" className="form-control" value={formData.orderId} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Product Type</label>
                  <select name="productType" className="form-control" value={formData.productType} onChange={handleChange} required>
                    <option value="">Select...</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Pant">Pant</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Dress">Dress</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label>Size</label>
                  <select name="size" className="form-control" value={formData.size} onChange={handleChange}>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label>Color</label>
                  <input type="text" name="color" className="form-control" value={formData.color} onChange={handleChange} />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Target Quantity</label>
                  <input type="number" name="targetQuantity" className="form-control" value={formData.targetQuantity} onChange={handleChange} required />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label>Actual Quantity</label>
                  <input type="number" name="actualQuantity" className="form-control" value={formData.actualQuantity} onChange={handleChange} />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Rejected</label>
                  <input type="number" name="rejectedQuantity" className="form-control" value={formData.rejectedQuantity} onChange={handleChange} />
                </div>
                <div className="col-md-4 mb-3">
                  <label>Quality Grade</label>
                  <select name="qualityGrade" className="form-control" value={formData.qualityGrade} onChange={handleChange}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Machine Used</label>
                  <input type="text" name="machineUsed" className="form-control" value={formData.machineUsed} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Overtime Hours</label>
                  <input type="number" step="0.5" name="overtimeHours" className="form-control" value={formData.overtimeHours} onChange={handleChange} />
                </div>
              </div>
              <div className="mb-3">
                <label>Notes</label>
                <textarea name="notes" className="form-control" rows="2" value={formData.notes} onChange={handleChange}></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Save Production Entry</button>
            </form>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card">
            <h5>Today's Entries</h5>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Qty</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.length === 0 ? (
                    <tr><td colSpan="3" className="text-center">No entries yet</td></tr>
                  ) : (
                    entries.map((entry, idx) => (
                      <tr key={idx}>
                        <td>{entry.orderId}</td>
                        <td>{entry.actualQuantity}</td>
                        <td><span className={`badge bg-${entry.qualityGrade === 'A' ? 'success' : entry.qualityGrade === 'B' ? 'warning' : 'danger'}`}>{entry.qualityGrade}</span></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionEntry;
