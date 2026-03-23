import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
  const [stats, setStats] = useState({
    teamSize: 24,
    todayOutput: 1250,
    efficiency: 87,
    pendingReports: 3
  });

  useEffect(() => {
    setStats({
      teamSize: 24,
      todayOutput: 1250,
      efficiency: 87,
      pendingReports: 3
    });
  }, []);

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
  const [aiData, setAiData] = useState({
    target: 1000,
    completed: 600,
    timeSpent: 5,
    workers: 10
  });

  const efficiency = ((aiData.completed / aiData.target) * 100).toFixed(1);
  const delayRisk = efficiency < 70 ? 'HIGH' : efficiency < 90 ? 'MEDIUM' : 'LOW';
  const riskColor = efficiency < 70 ? '#ef4444' : efficiency < 90 ? '#f59e0b' : '#10b981';

  return (
    <div className="m-dashboard">
      <h2 className="m-title">
        <i className="fas fa-robot"></i> Manager Dashboard
      </h2>

      {/* Stats Row */}
      <div className="m-stats-row">
        <div className="m-stat-card">
          <div className="m-stat-icon"><i className="fas fa-users"></i></div>
          <div className="m-stat-info">
            <h3>{stats.teamSize}</h3>
            <p>Team Members</p>
          </div>
        </div>
        <div className="m-stat-card m-stat-blue">
          <div className="m-stat-icon"><i className="fas fa-boxes"></i></div>
          <div className="m-stat-info">
            <h3>{stats.todayOutput}</h3>
            <p>Today's Output</p>
          </div>
        </div>
        <div className="m-stat-card m-stat-green">
          <div className="m-stat-icon"><i className="fas fa-chart-line"></i></div>
          <div className="m-stat-info">
            <h3>{stats.efficiency}%</h3>
            <p>Efficiency</p>
          </div>
        </div>
        <div className="m-stat-card m-stat-pink">
          <div className="m-stat-icon"><i className="fas fa-bell"></i></div>
          <div className="m-stat-info">
            <h3>{stats.pendingReports}</h3>
            <p>Pending Reports</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="m-main-content">
        {/* Left Column */}
        <div className="m-left-col">
          {/* AI Prediction Card */}
          <div className="m-ai-card">
            <div className="m-ai-header">
              <div className="m-brain"><i className="fas fa-brain"></i></div>
              <div>
                <h3><i className="fas fa-robot"></i> AI Delay Prediction</h3>
                <p>Real-time production analysis</p>
              </div>
            </div>

            <div className="m-ai-inputs">
              <div className="m-input-group">
                <label><i className="fas fa-bullseye"></i> Target</label>
                <input type="number" value={aiData.target} 
                  onChange={(e) => setAiData({...aiData, target: Number(e.target.value)})} />
              </div>
              <div className="m-input-group">
                <label><i className="fas fa-check"></i> Completed</label>
                <input type="number" value={aiData.completed} 
                  onChange={(e) => setAiData({...aiData, completed: Number(e.target.value)})} />
              </div>
              <div className="m-input-group">
                <label><i className="fas fa-clock"></i> Time (hrs)</label>
                <input type="number" value={aiData.timeSpent} 
                  onChange={(e) => setAiData({...aiData, timeSpent: Number(e.target.value)})} />
              </div>
              <div className="m-input-group">
                <label><i className="fas fa-users"></i> Workers</label>
                <input type="number" value={aiData.workers} 
                  onChange={(e) => setAiData({...aiData, workers: Number(e.target.value)})} />
              </div>
            </div>

            <div className="m-ai-results">
              <div className="m-efficiency-ring" style={{background: `conic-gradient(${riskColor} ${efficiency}%, #333 0%)`}}>
                <div className="m-efficiency-inner">
                  <h4>{efficiency}%</h4>
                  <span>Efficiency</span>
                </div>
              </div>
              <div className="m-delay-badge" style={{backgroundColor: riskColor}}>
                <i className={`fas fa-${delayRisk === 'HIGH' ? 'exclamation-triangle' : delayRisk === 'MEDIUM' ? 'clock' : 'check-circle'}`}></i>
                Delay: {delayRisk}
              </div>
            </div>

            <div className="m-ai-suggestion">
              <i className="fas fa-lightbulb"></i>
              <p>
                {efficiency < 70 ? '⚠️ Add workers or extend shift' : 
                 efficiency < 90 ? '📊 Consider adding workers' : 
                 '✅ On track!'}
              </p>
            </div>
          </div>

          {/* Production Lines */}
          <div className="m-production-card">
            <h3><i className="fas fa-industry"></i> Production Lines</h3>
            <div className="m-lines-grid">
              <div className="m-line">
                <div className="m-line-header">
                  <span>Line 1</span>
                  <span className="m-status m-status-green">Active</span>
                </div>
                <div className="m-progress"><div className="m-progress-bar" style={{width: '85%', background: '#43e97b'}}></div></div>
                <div className="m-line-stats">
                  <span><i className="fas fa-box"></i> 850/1000</span>
                  <span><i className="fas fa-users"></i> 12</span>
                </div>
              </div>
              <div className="m-line">
                <div className="m-line-header">
                  <span>Line 2</span>
                  <span className="m-status m-status-yellow">At Risk</span>
                </div>
                <div className="m-progress"><div className="m-progress-bar" style={{width: '65%', background: '#f59e0b'}}></div></div>
                <div className="m-line-stats">
                  <span><i className="fas fa-box"></i> 650/1000</span>
                  <span><i className="fas fa-users"></i> 10</span>
                </div>
              </div>
              <div className="m-line">
                <div className="m-line-header">
                  <span>Line 3</span>
                  <span className="m-status m-status-red">Behind</span>
                </div>
                <div className="m-progress"><div className="m-progress-bar" style={{width: '45%', background: '#ef4444'}}></div></div>
                <div className="m-line-stats">
                  <span><i className="fas fa-box"></i> 450/1000</span>
                  <span><i className="fas fa-users"></i> 8</span>
                </div>
              </div>
              <div className="m-line">
                <div className="m-line-header">
                  <span>Line 4</span>
                  <span className="m-status m-status-green">Active</span>
                </div>
                <div className="m-progress"><div className="m-progress-bar" style={{width: '78%', background: '#667eea'}}></div></div>
                <div className="m-line-stats">
                  <span><i className="fas fa-box"></i> 780/1000</span>
                  <span><i className="fas fa-users"></i> 11</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="m-right-col">
          <div className="m-quick-card">
            <h3><i className="fas fa-bolt"></i> Quick Stats</h3>
            <div className="m-quick-list">
              <div className="m-quick-item">
                <div className="m-quick-icon m-icon-blue"><i className="fas fa-shopping-cart"></i></div>
                <div className="m-quick-info">
                  <h4>15</h4>
                  <p>Active Orders</p>
                </div>
              </div>
              <div className="m-quick-item">
                <div className="m-quick-icon m-icon-green"><i className="fas fa-star"></i></div>
                <div className="m-quick-info">
                  <h4>92%</h4>
                  <p>Quality Rate</p>
                </div>
              </div>
              <div className="m-quick-item">
                <div className="m-quick-icon m-icon-pink"><i className="fas fa-exclamation-triangle"></i></div>
                <div className="m-quick-info">
                  <h4>2</h4>
                  <p>Machine Issues</p>
                </div>
              </div>
            </div>
          </div>

          <div className="m-alerts-card">
            <h3><i className="fas fa-bell"></i> Alerts</h3>
            <div className="m-alerts-list">
              <div className="m-alert m-alert-yellow">
                <i className="fas fa-exclamation-triangle"></i>
                <span>Line 4 below target</span>
              </div>
              <div className="m-alert m-alert-blue">
                <i className="fas fa-tools"></i>
                <span>Maintenance due today</span>
              </div>
              <div className="m-alert m-alert-green">
                <i className="fas fa-check-circle"></i>
                <span>Order #123 completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
