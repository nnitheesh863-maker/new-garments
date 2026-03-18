import React from 'react';

const Reports = () => {
  const downloadReport = (type) => {
    alert(`Downloading ${type} report...`);
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4">Reports</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="dashboard-card text-center">
            <i className="fas fa-file-alt fa-3x text-primary mb-3"></i>
            <h5>Daily Report</h5>
            <p className="text-muted">Production summary for today</p>
            <button className="btn btn-sm btn-outline-primary" onClick={() => downloadReport('daily')}>
              <i className="fas fa-download me-1"></i> Download
            </button>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card text-center">
            <i className="fas fa-calendar-alt fa-3x text-success mb-3"></i>
            <h5>Weekly Report</h5>
            <p className="text-muted">Weekly performance analysis</p>
            <button className="btn btn-sm btn-outline-success" onClick={() => downloadReport('weekly')}>
              <i className="fas fa-download me-1"></i> Download
            </button>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card text-center">
            <i className="fas fa-chart-bar fa-3x text-warning mb-3"></i>
            <h5>Monthly Report</h5>
            <p className="text-muted">Comprehensive monthly analytics</p>
            <button className="btn btn-sm btn-outline-warning" onClick={() => downloadReport('monthly')}>
              <i className="fas fa-download me-1"></i> Download
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-card mt-4">
        <h5>Production Summary</h5>
        <div className="row text-center">
          <div className="col-md-3">
            <div className="p-3 bg-light rounded">
              <h4>150</h4>
              <small>Today's Output</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 bg-light rounded">
              <h4>85%</h4>
              <small>Efficiency</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 bg-light rounded">
              <h4>92%</h4>
              <small>Quality Rate</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 bg-light rounded">
              <h4>2</h4>
              <small>Defects</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
