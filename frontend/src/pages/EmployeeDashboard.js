import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductionEntry from '../components/employee/ProductionEntry';
import MaterialTracking from '../components/employee/MaterialTracking';
import MachineReport from '../components/employee/MachineReport';
import Salary from '../components/employee/Salary';
import Leaves from '../components/employee/Leaves';
import Training from '../components/employee/Training';
import Chat from '../components/employee/Chat';
import Reports from '../components/employee/Reports';
import ReportIssue from '../components/employee/ReportIssue';
import TrainingVideos from '../components/employee/TrainingVideos';
import AIChatbot from '../components/employee/AIChatbot';
import EmployeeAnalytics from '../components/employee/EmployeeAnalytics';

const EmployeeDashboard = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [stats, setStats] = useState({
    todayProduction: 0,
    efficiency: 0,
    materialStatus: 'OK',
    machineStatus: 'Active',
    leavesBalance: { sick: 10, casual: 12, earned: 15 }
  });

  useEffect(() => {
    // Load dashboard stats
    loadStats();
  }, []);

  const loadStats = async () => {
    // Mock data for demonstration
    setStats({
      todayProduction: 150,
      efficiency: 85,
      materialStatus: 'OK',
      machineStatus: 'Active',
      leavesBalance: { sick: 10, casual: 12, earned: 15 }
    });
  };

  return (
    <Routes>
      <Route index element={<DashboardHome stats={stats} />} />
      <Route path="production" element={<ProductionEntry />} />
      <Route path="materials" element={<MaterialTracking />} />
      <Route path="machines" element={<MachineReport />} />
      <Route path="salary" element={<Salary />} />
      <Route path="leaves" element={<Leaves />} />
      <Route path="training" element={<Training />} />
      <Route path="videos" element={<TrainingVideos />} />
      <Route path="chat" element={<Chat />} />
      <Route path="ai-assistant" element={<AIChatbot />} />
      <Route path="analytics" element={<EmployeeAnalytics />} />
      <Route path="reports" element={<Reports />} />
      <Route path="report-issue" element={<ReportIssue />} />
    </Routes>
  );
};

const DashboardHome = ({ stats }) => {
  const { t } = useTranslation();
  
  return (
    <div className="fade-in">
      <h2 className="mb-4">{t('dashboard')}</h2>
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
            <div className="chart-container">
              <canvas id="productionChart"></canvas>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card">
            <h5>Leave Balance</h5>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between">
                Sick Leave <span className="badge bg-primary">{stats.leavesBalance.sick}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                Casual Leave <span className="badge bg-success">{stats.leavesBalance.casual}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                Earned Leave <span className="badge bg-info">{stats.leavesBalance.earned}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
