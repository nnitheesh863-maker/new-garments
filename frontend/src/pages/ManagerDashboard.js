import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TeamOverview from '../components/manager/TeamOverview';
import Production from '../components/manager/Production';
import Materials from '../components/manager/Materials';
import Machines from '../components/manager/Machines';
import Quality from '../components/manager/Quality';
import Leaves from '../components/manager/Leaves';
import Analytics from '../components/manager/Analytics';
import ManagerAnalytics from '../components/manager/ManagerAnalytics';
import Orders from '../components/manager/Orders';
import ManagerReports from '../components/manager/ManagerReports';
import ManagerChat from '../components/manager/ManagerChat';
import ExportData from '../components/manager/ExportData';

const ManagerDashboard = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [stats, setStats] = useState({
    teamSize: 24,
    todayOutput: 1250,
    efficiency: 87,
    pendingReports: 3
  });

  useEffect(() => {
    // Load stats
    loadStats();
  }, []);

  const loadStats = async () => {
    // Mock stats - in real app, fetch from API
    setStats({
      teamSize: 24,
      todayOutput: 1250,
      efficiency: 87,
      pendingReports: 3
    });
  };

  return (
    <Routes>
      <Route index element={<ManagerHome stats={stats} />} />
      <Route path="team" element={<TeamOverview />} />
      <Route path="production" element={<Production />} />
      <Route path="materials" element={<Materials />} />
      <Route path="machines" element={<Machines />} />
      <Route path="quality" element={<Quality />} />
      <Route path="leaves" element={<Leaves />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="manager-analytics" element={<ManagerAnalytics />} />
      <Route path="orders" element={<Orders />} />
      <Route path="reports" element={<ManagerReports />} />
      <Route path="team-chat" element={<ManagerChat />} />
      <Route path="export" element={<ExportData />} />
    </Routes>
  );
};

const ManagerHome = ({ stats }) => {
  return (
    <div className="fade-in">
      <h2 className="mb-4">
        <i className="fas fa-tachometer-alt me-2"></i>
        Manager Dashboard
      </h2>
      
      {/* Stats Cards with Animation */}
      <div className="row mb-4">
        <div className="col-md-3 slide-in-up stagger-1">
          <div className="stat-card">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>{stats.teamSize}</h3>
                <p>Team Members</p>
              </div>
              <i className="fas fa-users fa-2x opacity-50"></i>
            </div>
          </div>
        </div>
        <div className="col-md-3 slide-in-up stagger-2">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>{stats.todayOutput}</h3>
                <p>Today's Output</p>
              </div>
              <i className="fas fa-boxes fa-2x opacity-50"></i>
            </div>
          </div>
        </div>
        <div className="col-md-3 slide-in-up stagger-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>{stats.efficiency}%</h3>
                <p>Efficiency</p>
              </div>
              <i className="fas fa-chart-line fa-2x opacity-50"></i>
            </div>
          </div>
        </div>
        <div className="col-md-3 slide-in-up stagger-4">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>{stats.pendingReports}</h3>
                <p>Pending Reports</p>
              </div>
              <i className="fas fa-bell fa-2x opacity-50"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row">
        <div className="col-md-8">
          <div className="dashboard-card">
            <h5>Quick Overview</h5>
            <div className="row text-center">
              <div className="col-4 mb-3">
                <div className="p-3 bg-light rounded">
                  <h4 className="text-primary">15</h4>
                  <small>Active Orders</small>
                </div>
              </div>
              <div className="col-4 mb-3">
                <div className="p-3 bg-light rounded">
                  <h4 className="text-success">92%</h4>
                  <small>Quality Rate</small>
                </div>
              </div>
              <div className="col-4 mb-3">
                <div className="p-3 bg-light rounded">
                  <h4 className="text-warning">2</h4>
                  <small>Machine Issues</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card">
            <h5>Alerts</h5>
            <div className="alert alert-warning mb-2">
              <small><i className="fas fa-exclamation-triangle me-1"></i> Line 4 below target</small>
            </div>
            <div className="alert alert-info">
              <small><i className="fas fa-tools me-1"></i> Maintenance due today</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
