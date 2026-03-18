import React from 'react';
import Garment3DAnimation from './Garment3DAnimation';

const DashboardHome = ({ stats }) => {
  return (
    <div className="fade-in">
      {/* 3D Garment Animation */}
      <div className="mb-4">
        <Garment3DAnimation />
      </div>

      <h2 className="mb-4">
        <i className="fas fa-home me-2"></i>
        Employee Dashboard
      </h2>

      <div className="row">
        <div className="col-md-3">
          <div className="stat-card">
            <h3>{stats.todayProduction}</h3>
            <p>Today's Production</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}>
            <h3>{stats.efficiency}%</h3>
            <p>Efficiency Rate</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <h3>{stats.materialStatus}</h3>
            <p>Material Status</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <h3>{stats.machineStatus}</h3>
            <p>Machine Status</p>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-8">
          <div className="dashboard-card">
            <h5>Production Overview</h5>
            <div className="row text-center">
              <div className="col-4">
                <div className="p-3 bg-light rounded">
                  <h4 className="text-primary">150</h4>
                  <small>Today's Output</small>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 bg-light rounded">
                  <h4 className="text-success">85%</h4>
                  <small>Efficiency</small>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 bg-light rounded">
                  <h4 className="text-info">92%</h4>
                  <small>Quality Rate</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card">
            <h5>Leave Balance</h5>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between">
                Sick Leave <span className="badge bg-primary">{stats.leavesBalance?.sick || 10}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                Casual Leave <span className="badge bg-success">{stats.leavesBalance?.casual || 12}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                Earned Leave <span className="badge bg-info">{stats.leavesBalance?.earned || 15}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
