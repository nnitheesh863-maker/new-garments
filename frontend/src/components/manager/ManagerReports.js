import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005/api';

const ManagerReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const response = await axios.get(`${API_URL}/reports`);
      setReports(response.data);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateReportStatus = async (reportId, status) => {
    try {
      await axios.put(`${API_URL}/reports/${reportId}`, { status });
      loadReports();
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'machine': return 'fa-cogs text-primary';
      case 'material': return 'fa-box text-success';
      case 'quality': return 'fa-check-circle text-warning';
      case 'safety': return 'fa-shield-alt text-danger';
      default: return 'fa-question text-secondary';
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'critical': return 'bg-danger';
      case 'high': return 'bg-warning';
      case 'medium': return 'bg-info';
      case 'low': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  };

  const pendingReports = reports.filter(r => r.status === 'pending');

  return (
    <div className="fade-in">
      <h2 className="mb-4">
        <i className="fas fa-bell me-2"></i>
        Issue Reports
        {pendingReports.length > 0 && (
          <span className="badge bg-danger ms-2 notification-pop">
            {pendingReports.length} Pending
          </span>
        )}
      </h2>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <h3>{pendingReports.length}</h3>
            <p>Pending Reports</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <h3>{reports.filter(r => r.status === 'in-progress').length}</h3>
            <p>In Progress</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <h3>{reports.filter(r => r.status === 'resolved').length}</h3>
            <p>Resolved</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
            <h3>{reports.length}</h3>
            <p>Total Reports</p>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <h5>Recent Reports</h5>
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : reports.length === 0 ? (
          <p className="text-center text-muted py-4">No reports yet</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Employee</th>
                  <th>Category</th>
                  <th>Issue</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, idx) => (
                  <tr key={report.id} className={`table-row-animated ${idx < 3 ? 'stagger-' + (idx + 1) : ''}`}>
                    <td><strong>{report.reportId}</strong></td>
                    <td>{report.employeeName}</td>
                    <td>
                      <i className={`fas ${getCategoryIcon(report.category)} me-1`}></i>
                      {report.category}
                    </td>
                    <td>{report.issueType}</td>
                    <td>
                      <span className={`badge ${getPriorityBadge(report.priority)}`}>
                        {report.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`badge bg-${
                        report.status === 'pending' ? 'warning' :
                        report.status === 'in-progress' ? 'info' : 'success'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td>
                      {report.status === 'pending' && (
                        <>
                          <button
                            className="btn btn-sm btn-info me-1"
                            onClick={() => updateReportStatus(report.id, 'in-progress')}
                            title="Start working"
                          >
                            <i className="fas fa-play"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => updateReportStatus(report.id, 'resolved')}
                            title="Resolve"
                          >
                            <i className="fas fa-check"></i>
                          </button>
                        </>
                      )}
                      {report.status === 'in-progress' && (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => updateReportStatus(report.id, 'resolved')}
                        >
                          <i className="fas fa-check"></i> Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerReports;
