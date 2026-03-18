import React, { useState } from 'react';

const MaterialTracking = () => {
  const [requestForm, setRequestForm] = useState({
    materialType: '',
    quantity: '',
    unit: 'pieces',
    purpose: '',
    priority: 'medium'
  });

  const [materials] = useState([
    { id: 'MAT001', name: 'Cotton Fabric', type: 'fabric', stock: 1500, unit: 'meters', status: 'available' },
    { id: 'MAT002', name: 'Polyester Thread', type: 'thread', stock: 500, unit: 'spools', status: 'low-stock' },
    { id: 'MAT003', name: 'Buttons', type: 'button', stock: 2000, unit: 'pieces', status: 'available' },
    { id: 'MAT004', name: 'Zippers', type: 'zipper', stock: 800, unit: 'pieces', status: 'available' },
  ]);

  const handleChange = (e) => {
    setRequestForm({ ...requestForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Material request submitted! Awaiting manager approval.');
    setRequestForm({ materialType: '', quantity: '', unit: 'pieces', purpose: '', priority: 'medium' });
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4">Material Tracking</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="dashboard-card">
            <h5>Material Request</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Material Type</label>
                <select name="materialType" className="form-control" value={requestForm.materialType} onChange={handleChange} required>
                  <option value="">Select...</option>
                  <option value="fabric">Fabric</option>
                  <option value="thread">Thread</option>
                  <option value="button">Buttons</option>
                  <option value="zipper">Zippers</option>
                  <option value="label">Labels</option>
                  <option value="packaging">Packaging</option>
                </select>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Quantity</label>
                  <input type="number" name="quantity" className="form-control" value={requestForm.quantity} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Unit</label>
                  <select name="unit" className="form-control" value={requestForm.unit} onChange={handleChange}>
                    <option value="pieces">Pieces</option>
                    <option value="meters">Meters</option>
                    <option value="kg">Kg</option>
                    <option value="rolls">Rolls</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label>Purpose</label>
                <input type="text" name="purpose" className="form-control" value={requestForm.purpose} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label>Priority</label>
                <select name="priority" className="form-control" value={requestForm.priority} onChange={handleChange}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Request Material</button>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="dashboard-card">
            <h5>Available Materials</h5>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Stock</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map(m => (
                    <tr key={m.id}>
                      <td>{m.name}</td>
                      <td>{m.type}</td>
                      <td>{m.stock} {m.unit}</td>
                      <td><span className={`badge bg-${m.status === 'available' ? 'success' : 'warning'}`}>{m.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-card mt-4">
            <h5>Usage History</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span>Cotton Fabric</span>
                <span className="text-muted">-50 meters</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Polyester Thread</span>
                <span className="text-muted">-5 spools</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialTracking;
