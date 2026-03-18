import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005/api';

const ReportIssue = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    issueType: '',
    priority: 'medium',
    description: '',
    category: 'machine'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/reports`, {
        ...formData,
        employeeId: user.employeeId,
        employeeName: user.name
      });

      setSubmitted(true);
      setFormData({
        issueType: '',
        priority: 'medium',
        description: '',
        category: 'machine'
      });

      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      alert('Error submitting report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4">Report an Issue</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="dashboard-card">
            <h5>Submit New Report</h5>
            {submitted && (
              <div className="alert alert-success mb-3">
                <i className="fas fa-check-circle me-2"></i>
                Report submitted successfully! Manager will be notified.
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Category</label>
                  <select name="category" className="form-control" value={formData.category} onChange={handleChange} required>
                    <option value="machine">Machine Issue</option>
                    <option value="material">Material Issue</option>
                    <option value="quality">Quality Issue</option>
                    <option value="safety">Safety Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Priority</label>
                  <select name="priority" className="form-control" value={formData.priority} onChange={handleChange} required>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label>Issue Type</label>
                <input type="text" name="issueType" className="form-control" placeholder="e.g., Needle breakage, Thread tension" value={formData.issueType} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea name="description" className="form-control" rows="4" placeholder="Describe the issue in detail..." value={formData.description} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-animated" disabled={loading}>
                {loading ? 'Submitting...' : <><i className="fas fa-paper-plane me-2"></i>Submit Report</>}
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card">
            <h5>Report Categories</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fas fa-cogs text-primary me-2"></i> Machine</span>
                <span className="badge bg-primary">Active</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fas fa-box text-success me-2"></i> Material</span>
                <span className="badge bg-success">Active</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fas fa-check-circle text-warning me-2"></i> Quality</span>
                <span className="badge bg-warning">Active</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fas fa-shield-alt text-danger me-2"></i> Safety</span>
                <span className="badge bg-danger">Active</span>
              </li>
            </ul>
          </div>
          <div className="dashboard-card mt-4">
            <h5>My Reports</h5>
            <p className="text-muted small">Recent reports will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
