import React, { useState } from 'react';

const Materials = () => {
  const [requests, setRequests] = useState([
    { id: 'REQ001', employee: 'Ravi Kumar', material: 'Fabric', quantity: '50 meters', priority: 'high', status: 'pending' },
    { id: 'REQ002', employee: 'Priya Devi', material: 'Thread', quantity: '20 spools', priority: 'medium', status: 'pending' },
    { id: 'REQ003', employee: 'Suresh Babu', material: 'Buttons', quantity: '100 pieces', priority: 'low', status: 'approved' }
  ]);

  const [inventory] = useState([
    { name: 'Cotton Fabric', stock: 1200, unit: 'meters', status: 'available' },
    { name: 'Polyester Thread', stock: 200, unit: 'spools', status: 'low-stock' },
    { name: 'Buttons', stock: 5000, unit: 'pieces', status: 'available' }
  ]);

  const handleApprove = (id) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'approved' } : r));
  };

  const handleReject = (id) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4">Material Management</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="dashboard-card">
            <h5>Material Requests</h5>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Material</th>
                    <th>Quantity</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(req => (
                    <tr key={req.id}>
                      <td>{req.employee}</td>
                      <td>{req.material}</td>
                      <td>{req.quantity}</td>
                      <td><span className={`badge bg-${req.priority === 'high' ? 'danger' : req.priority === 'medium' ? 'warning' : 'info'}`}>{req.priority}</span></td>
                      <td><span className={`badge bg-${req.status === 'approved' ? 'success' : req.status === 'pending' ? 'warning' : 'secondary'}`}>{req.status}</span></td>
                      <td>
                        {req.status === 'pending' && (
                          <>
                            <button className="btn btn-sm btn-success me-1" onClick={() => handleApprove(req.id)}>✓</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleReject(req.id)}>✗</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card">
            <h5>Inventory Status</h5>
            <ul className="list-group list-group-flush">
              {inventory.map(item => (
                <li key={item.name} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{item.name}</span>
                  <span className={`badge bg-${item.status === 'available' ? 'success' : 'warning'}`}>
                    {item.stock} {item.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="dashboard-card mt-4">
            <h5>Low Stock Alert</h5>
            <div className="alert alert-warning">
              <small>Polyester Thread is running low. Consider reordering.</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Materials;
