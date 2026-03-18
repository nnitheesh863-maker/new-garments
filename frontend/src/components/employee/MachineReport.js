import React, { useState } from 'react';

const MachineReport = () => {
  const [reportForm, setReportForm] = useState({
    machineId: '',
    issueType: '',
    description: '',
    urgency: 'medium'
  });

  const [issues, setIssues] = useState([
    { id: 'ISS001', machine: 'MACH001', issue: 'Needle breakage', urgency: 'high', status: 'pending', time: '2 hours ago' },
    { id: 'ISS002', machine: 'MACH003', issue: 'Thread tension', urgency: 'medium', status: 'in-progress', time: '4 hours ago' }
  ]);

  const handleChange = (e) => {
    setReportForm({ ...reportForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIssue = {
      id: 'ISS' + Date.now().toString().slice(-6),
      machine: reportForm.machineId,
      issue: reportForm.issueType,
      urgency: reportForm.urgency,
      status: 'pending',
      time: 'Just now'
    };
    setIssues([newIssue, ...issues]);
    alert('Issue reported successfully!');
    setReportForm({ machineId: '', issueType: '', description: '', urgency: 'medium' });
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4">Machine Report</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="dashboard-card">
            <h5>Report an Issue</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Machine ID</label>
                <input type="text" name="machineId" className="form-control" value={reportForm.machineId} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label>Issue Type</label>
                <select name="issueType" className="form-control" value={reportForm.issueType} onChange={handleChange} required>
                  <option value="">Select...</option>
                  <option value="breakdown">Machine Breakdown</option>
                  <option value="power">Power Issue</option>
                  <option value="quality">Quality Problem</option>
                  <option value="safety">Safety Hazard</option>
                  <option value="material">Material Defect</option>
                  <option value="calibration">Calibration Needed</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea name="description" className="form-control" rows="3" value={reportForm.description} onChange={handleChange} required></textarea>
              </div>
              <div className="mb-3">
                <label>Urgency Level</label>
                <select name="urgency" className="form-control" value={reportForm.urgency} onChange={handleChange}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <button type="submit" className="btn btn-warning">Report Issue</button>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="dashboard-card">
            <h5>My Reported Issues</h5>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Machine</th>
                    <th>Issue</th>
                    <th>Urgency</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map(issue => (
                    <tr key={issue.id}>
                      <td>{issue.machine}</td>
                      <td>{issue.issue}</td>
                      <td><span className={`badge bg-${issue.urgency === 'critical' ? 'danger' : issue.urgency === 'high' ? 'warning' : 'info'}`}>{issue.urgency}</span></td>
                      <td><span className={`badge bg-${issue.status === 'pending' ? 'warning' : issue.status === 'in-progress' ? 'info' : 'success'}`}>{issue.status}</span></td>
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

export default MachineReport;
