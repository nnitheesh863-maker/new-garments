import React, { useState } from 'react';

const Leaves = () => {
  const [leaveForm, setLeaveForm] = useState({
    leaveType: 'sick',
    startDate: '',
    endDate: '',
    reason: '',
    isHalfDay: false
  });

  const [leaveHistory, setLeaveHistory] = useState([
    { id: 'L001', type: 'sick', from: '2024-01-15', to: '2024-01-16', status: 'approved' },
    { id: 'L002', type: 'casual', from: '2024-01-10', to: '2024-01-10', status: 'approved' }
  ]);

  const leaveBalance = {
    sick: { available: 10, used: 2 },
    casual: { available: 12, used: 5 },
    earned: { available: 15, used: 3 }
  };

  const handleChange = (e) => {
    setLeaveForm({ ...leaveForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLeave = {
      id: 'L' + Date.now().toString().slice(-6),
      type: leaveForm.leaveType,
      from: leaveForm.startDate,
      to: leaveForm.endDate,
      status: 'pending'
    };
    setLeaveHistory([newLeave, ...leaveHistory]);
    alert('Leave application submitted successfully!');
    setLeaveForm({ leaveType: 'sick', startDate: '', endDate: '', reason: '', isHalfDay: false });
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4">Leave Management</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="dashboard-card">
            <h5>Apply for Leave</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Leave Type</label>
                <select name="leaveType" className="form-control" value={leaveForm.leaveType} onChange={handleChange} required>
                  <option value="sick">Sick Leave</option>
                  <option value="casual">Casual Leave</option>
                  <option value="earned">Earned Leave</option>
                  <option value="maternity">Maternity Leave</option>
                  <option value="paternity">Paternity Leave</option>
                  <option value="unpaid">Unpaid Leave</option>
                </select>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Start Date</label>
                  <input type="date" name="startDate" className="form-control" value={leaveForm.startDate} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>End Date</label>
                  <input type="date" name="endDate" className="form-control" value={leaveForm.endDate} onChange={handleChange} required />
                </div>
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="halfDay" checked={leaveForm.isHalfDay} onChange={(e) => setLeaveForm({...leaveForm, isHalfDay: e.target.checked})} />
                <label className="form-check-label" htmlFor="halfDay">Half Day</label>
              </div>
              <div className="mb-3">
                <label>Reason</label>
                <textarea name="reason" className="form-control" rows="2" value={leaveForm.reason} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Apply Leave</button>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="dashboard-card">
            <h5>Leave Balance</h5>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Available</th>
                    <th>Used</th>
                    <th>Remaining</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(leaveBalance).map(([type, data]) => (
                    <tr key={type}>
                      <td>{type.charAt(0).toUpperCase() + type.slice(1)}</td>
                      <td>{data.available}</td>
                      <td>{data.used}</td>
                      <td><strong>{data.available - data.used}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-card mt-4">
            <h5>Leave History</h5>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveHistory.map(leave => (
                    <tr key={leave.id}>
                      <td>{leave.from}</td>
                      <td>{leave.to}</td>
                      <td>{leave.type}</td>
                      <td><span className={`badge bg-${leave.status === 'approved' ? 'success' : leave.status === 'pending' ? 'warning' : 'danger'}`}>{leave.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaves;
