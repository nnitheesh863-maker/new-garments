import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Users from '../components/admin/Users';
import Settings from '../components/admin/Settings';
import MasterData from '../components/admin/MasterData';
import Reports from '../components/admin/Reports';
import Compliance from '../components/admin/Compliance';
import AiModels from '../components/admin/AiModels';
import AdminExport from '../components/admin/AdminExport';

const AdminDashboard = () => {
  return (
    <Routes>
      <Route index element={<AdminHome />} />
      <Route path="users" element={<Users />} />
      <Route path="settings" element={<Settings />} />
      <Route path="master-data" element={<MasterData />} />
      <Route path="reports" element={<Reports />} />
      <Route path="compliance" element={<Compliance />} />
      <Route path="ai-models" element={<AiModels />} />
      <Route path="export" element={<AdminExport />} />
    </Routes>
  );
};

const AdminHome = () => {
  return (
    <div className="fade-in">
      <h2 className="mb-4">Admin Dashboard</h2>
      <div className="row">
        <div className="col-md-3">
          <div className="stat-card">
            <h3>150</h3>
            <p>Total Employees</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}>
            <h3>98%</h3>
            <p>System Uptime</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <h3>42</h3>
            <p>Active Sessions</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <h3>5</h3>
            <p>Security Alerts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
