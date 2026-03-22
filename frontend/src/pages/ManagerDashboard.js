import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
  const [stats, setStats] = useState({
    teamSize: 24,
    todayOutput: 1250,
    efficiency: 87,
    pendingReports: 3
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
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
  const [aiPrediction, setAiPrediction] = useState({
    target: 1000,
    completed: 600,
    timeSpent: 5,
    workers: 10
  });
  const [predictionResult, setPredictionResult] = useState(null);
  const [animateBrain, setAnimateBrain] = useState(false);

  useEffect(() => {
    calculateDelay();
  }, []);

  const calculateEfficiency = (target, completed) => {
    return ((completed / target) * 100).toFixed(1);
  };

  const getDelayLevel = (efficiency) => {
    if (efficiency < 70) return { level: 'HIGH', color: '#ef4444', icon: 'exclamation-triangle' };
    if (efficiency < 90) return { level: 'MEDIUM', color: '#f59e0b', icon: 'clock' };
    return { level: 'LOW', color: '#10b981', icon: 'check-circle' };
  };

  const getSuggestion = (efficiency, workers) => {
    if (efficiency < 70) {
      const extraWorkers = Math.ceil(workers * 0.3);
      return `⚠️ Critical: Add ${extraWorkers} workers or extend shift by 2 hours to meet deadline`;
    }
    if (efficiency < 90) {
      const extraWorkers = Math.ceil(workers * 0.15);
      return `📊 Warning: Consider adding ${extraWorkers} workers to improve pace`;
    }
    return `✅ Excellent: On track! Current efficiency is optimal`;
  };

  const calculateDelay = () => {
    const { target, completed, timeSpent, workers } = aiPrediction;
    const efficiency = calculateEfficiency(target, completed);
    const delayInfo = getDelayLevel(parseFloat(efficiency));
    const suggestion = getSuggestion(parseFloat(efficiency), workers);
    const remainingWork = target - completed;
    const estimatedHoursNeeded = (remainingWork / (completed / timeSpent)).toFixed(1);

    setPredictionResult({
      efficiency,
      delayInfo,
      suggestion,
      remainingWork,
      estimatedHoursNeeded,
      throughput: (completed / timeSpent).toFixed(1),
      perWorkerOutput: (completed / timeSpent / workers).toFixed(1)
    });
    setAnimateBrain(true);
    setTimeout(() => setAnimateBrain(false), 1000);
  };

  const handleInputChange = (field, value) => {
    setAiPrediction(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  return (
    <div className="fade-in manager-home">
      <h2 className="page-title">
        <i className="fas fa-robot me-2"></i>
        Manager Dashboard
      </h2>

      {/* Stats Cards Row */}
      <div className="stats-grid mb-4">
        <div className="stat-card animated-card" style={{ animationDelay: '0s' }}>
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.teamSize}</h3>
            <p>Team Members</p>
          </div>
          <div className="stat-glow"></div>
        </div>

        <div className="stat-card animated-card gradient-1" style={{ animationDelay: '0.1s' }}>
          <div className="stat-icon">
            <i className="fas fa-boxes"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.todayOutput}</h3>
            <p>Today's Output</p>
          </div>
          <div className="stat-glow"></div>
        </div>

        <div className="stat-card animated-card gradient-2" style={{ animationDelay: '0.2s' }}>
          <div className="stat-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.efficiency}%</h3>
            <p>Efficiency</p>
          </div>
          <div className="stat-glow"></div>
        </div>

        <div className="stat-card animated-card gradient-3" style={{ animationDelay: '0.3s' }}>
          <div className="stat-icon">
            <i className="fas fa-bell"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.pendingReports}</h3>
            <p>Pending Reports</p>
          </div>
          <div className="stat-glow"></div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        {/* AI Prediction Section */}
        <div className="ai-section">
          <div className="ai-prediction-card glass-card animated-card" style={{ animationDelay: '0.4s' }}>
            <div className="ai-header">
              <div className={`ai-brain ${animateBrain ? 'brain-pulse' : ''}`}>
                <i className="fas fa-brain"></i>
              </div>
              <div className="ai-title">
                <h3><i className="fas fa-robot me-2"></i>AI Delay Prediction</h3>
                <p>Real-time production analysis with ML-powered insights</p>
              </div>
            </div>

            <div className="ai-body">
              <div className="ai-inputs-grid">
                <div className="ai-input-group">
                  <label><i className="fas fa-bullseye"></i> Target Pieces</label>
                  <input
                    type="number"
                    value={aiPrediction.target}
                    onChange={(e) => handleInputChange('target', e.target.value)}
                    onBlur={calculateDelay}
                  />
                </div>
                <div className="ai-input-group">
                  <label><i className="fas fa-check-circle"></i> Completed</label>
                  <input
                    type="number"
                    value={aiPrediction.completed}
                    onChange={(e) => handleInputChange('completed', e.target.value)}
                    onBlur={calculateDelay}
                  />
                </div>
                <div className="ai-input-group">
                  <label><i className="fas fa-clock"></i> Time (Hours)</label>
                  <input
                    type="number"
                    value={aiPrediction.timeSpent}
                    onChange={(e) => handleInputChange('timeSpent', e.target.value)}
                    onBlur={calculateDelay}
                  />
                </div>
                <div className="ai-input-group">
                  <label><i className="fas fa-users"></i> Workers</label>
                  <input
                    type="number"
                    value={aiPrediction.workers}
                    onChange={(e) => handleInputChange('workers', e.target.value)}
                    onBlur={calculateDelay}
                  />
                </div>
              </div>

              {predictionResult && (
                <div className="ai-results-section">
                  <div className="efficiency-meter">
                    <div className="efficiency-ring" style={{
                      background: `conic-gradient(${predictionResult.delayInfo.color} ${predictionResult.efficiency}%, rgba(255,255,255,0.1) 0%)`
                    }}>
                      <div className="efficiency-inner">
                        <h4>{predictionResult.efficiency}%</h4>
                        <span>Efficiency</span>
                      </div>
                    </div>
                  </div>

                  <div className="delay-badge" style={{ backgroundColor: predictionResult.delayInfo.color }}>
                    <i className={`fas fa-${predictionResult.delayInfo.icon}`}></i>
                    <span>Delay Risk: {predictionResult.delayInfo.level}</span>
                  </div>

                  <div className="ai-metrics-grid">
                    <div className="ai-metric">
                      <i className="fas fa-tachometer-alt"></i>
                      <div>
                        <strong>{predictionResult.throughput}</strong>
                        <span>pcs/hour</span>
                      </div>
                    </div>
                    <div className="ai-metric">
                      <i className="fas fa-user-friends"></i>
                      <div>
                        <strong>{predictionResult.perWorkerOutput}</strong>
                        <span>per worker</span>
                      </div>
                    </div>
                    <div className="ai-metric">
                      <i className="fas fa-hourglass-half"></i>
                      <div>
                        <strong>{predictionResult.estimatedHoursNeeded}h</strong>
                        <span>remaining</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="ai-suggestion">
                <i className="fas fa-lightbulb"></i>
                <p>{predictionResult?.suggestion}</p>
              </div>
            </div>
          </div>

          {/* Production Lines */}
          <div className="production-section glass-card animated-card" style={{ animationDelay: '0.5s' }}>
            <h5><i className="fas fa-industry me-2"></i>Production Lines Status</h5>
            <div className="production-lines-grid">
              <div className="production-line">
                <div className="line-header">
                  <span className="line-name">Line 1</span>
                  <span className="line-status on">Active</span>
                </div>
                <div className="line-progress">
                  <div className="progress-bar" style={{ width: '85%', background: 'linear-gradient(90deg, #43e97b, #38ef7d)' }}></div>
                </div>
                <div className="line-stats">
                  <span><i className="fas fa-box"></i> 850/1000</span>
                  <span><i className="fas fa-users"></i> 12</span>
                  <span><i className="fas fa-clock"></i> 6h</span>
                </div>
              </div>

              <div className="production-line">
                <div className="line-header">
                  <span className="line-name">Line 2</span>
                  <span className="line-status warning">At Risk</span>
                </div>
                <div className="line-progress">
                  <div className="progress-bar" style={{ width: '65%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }}></div>
                </div>
                <div className="line-stats">
                  <span><i className="fas fa-box"></i> 650/1000</span>
                  <span><i className="fas fa-users"></i> 10</span>
                  <span><i className="fas fa-clock"></i> 5h</span>
                </div>
              </div>

              <div className="production-line">
                <div className="line-header">
                  <span className="line-name">Line 3</span>
                  <span className="line-status danger">Behind</span>
                </div>
                <div className="line-progress">
                  <div className="progress-bar" style={{ width: '45%', background: 'linear-gradient(90deg, #ef4444, #f87171)' }}></div>
                </div>
                <div className="line-stats">
                  <span><i className="fas fa-box"></i> 450/1000</span>
                  <span><i className="fas fa-users"></i> 8</span>
                  <span><i className="fas fa-clock"></i> 4h</span>
                </div>
              </div>

              <div className="production-line">
                <div className="line-header">
                  <span className="line-name">Line 4</span>
                  <span className="line-status on">Active</span>
                </div>
                <div className="line-progress">
                  <div className="progress-bar" style={{ width: '78%', background: 'linear-gradient(90deg, #667eea, #764ba2)' }}></div>
                </div>
                <div className="line-stats">
                  <span><i className="fas fa-box"></i> 780/1000</span>
                  <span><i className="fas fa-users"></i> 11</span>
                  <span><i className="fas fa-clock"></i> 5.5h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="sidebar-section">
          <div className="dashboard-card glass-card animated-card" style={{ animationDelay: '0.6s' }}>
            <h5><i className="fas fa-bolt me-2"></i>Quick Stats</h5>
            <div className="quick-stats-list">
              <div className="quick-stat">
                <div className="quick-stat-icon" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="quick-stat-content">
                  <h4>15</h4>
                  <p>Active Orders</p>
                </div>
              </div>
              <div className="quick-stat">
                <div className="quick-stat-icon" style={{ background: 'linear-gradient(135deg, #43e97b, #38ef7d)' }}>
                  <i className="fas fa-star"></i>
                </div>
                <div className="quick-stat-content">
                  <h4>92%</h4>
                  <p>Quality Rate</p>
                </div>
              </div>
              <div className="quick-stat">
                <div className="quick-stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)' }}>
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="quick-stat-content">
                  <h4>2</h4>
                  <p>Machine Issues</p>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card glass-card animated-card" style={{ animationDelay: '0.7s' }}>
            <h5><i className="fas fa-bell me-2"></i>Alerts</h5>
            <div className="alerts-list">
              <div className="alert-item alert-warning">
                <i className="fas fa-exclamation-triangle"></i>
                <span>Line 4 below target</span>
              </div>
              <div className="alert-item alert-info">
                <i className="fas fa-tools"></i>
                <span>Maintenance due today</span>
              </div>
              <div className="alert-item alert-success">
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
