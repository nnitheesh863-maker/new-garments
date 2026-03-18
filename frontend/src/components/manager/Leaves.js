import React, { useState } from 'react';

const Leaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 'L001', employee: 'Ravi Kumar', type: 'sick', from: '2024-01-20', to: '2024-01-21', status: 'pending' },
    { id: 'L002', employee: 'Priya Devi', type: 'casual', from: '2024-01-22', to: '2024-01-22', status: 'pending' },
    { id: 'L003', employee: 'Suresh Babu', type: 'earned', from: '2024-01-25', to: '2024-01-27', status: 'approved' }
  ]);

  const handleApprove = (id) => {
    setLeaveRequests(leaveRequests.map(r => r.id === id ? { ...r, status: 'approved' } : r));
  };

  const handleReject = (id) => {
    setLeaveRequests(leaveRequests.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4">Leave Management</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="dashboard-card">
            <h5>Pending Leave Requests</h5>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map(req => (
                    <tr key={req.id}>
                      <td>{req.employee}</td>
                      <td>{req.type}</td>
                      <td>{req.from}</td>
                      <td>{req.to}</td>
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
            <h5>Team Availability</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span>Total Team</span>
                <strong>24</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>On Leave</span>
                <strong className="text-warning">2</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Available</span>
                <strong className="text-success">22</strong>
              </li>
            </ul>
          </div>
          <div className="dashboard-card mt-4">
            <h5>Holidays</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Republic Day - Jan 26</li>
              <li className="list-group-item">Maha Shivaratri - Feb 8</li>
              <li className="list-group-item">Holi - Mar 25</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaves;
