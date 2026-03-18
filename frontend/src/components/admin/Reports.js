import React from 'react';

const Reports = () => {
  const generateReport = (type) => {
    alert(`Generating ${type} report...`);
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4">Reports & Analytics</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="dashboard-card text-center">
            <i className="fas fa-chart-line fa-3x text-primary mb-3"></i>
            <h5>Production Report</h5>
            <p className="text-muted">Daily/Monthly production summary</p>
            <button className="btn btn-sm btn-outline-primary" onClick={() => generateReport('production')}>
              <i className="fas fa-download me-1"></i> Generate
            </button>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card text-center">
            <i className="fas fa-money-bill-wave fa-3x text-success mb-3"></i>
            <h5>Financial Report</h5>
            <p className="text-muted">P&L, Balance Sheet, Cash Flow</p>
            <button className="btn btn-sm btn-outline-success" onClick={() => generateReport('financial')}>
              <i className="fas fa-download me-1"></i> Generate
            </button>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card text-center">
            <i className="fas fa-users fa-3x text-warning mb-3"></i>
            <h5>HR Report</h5>
            <p className="text-muted">Attendance, Leave, Payroll</p>
            <button className="btn btn-sm btn-outline-warning" onClick={() => generateReport('hr')}>
              <i className="fas fa-download me-1"></i> Generate
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-card mt-4">
        <h5>Executive Summary</h5>
        <div className="row text-center">
          <div className="col-md-3">
            <div className="p-4 bg-light rounded">
              <h3>₹25L</h3>
              <small>Monthly Revenue</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-4 bg-light rounded">
              <h3>₹18L</h3>
              <small>Monthly Expenses</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-4 bg-light rounded">
              <h3>₹7L</h3>
              <small>Net Profit</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-4 bg-light rounded">
              <h3>28%</h3>
              <small>Profit Margin</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
