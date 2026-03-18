import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005/api';

const Analytics = () => {
  const [summary, setSummary] = useState({
    totalEmployees: 0,
    todayProduction: 0,
    pendingReports: 0,
    efficiency: 0,
    qualityRate: 0
  });
  const [productionData, setProductionData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const [summaryRes, productionRes] = await Promise.all([
        axios.get(`${API_URL}/analytics/summary`),
        axios.get(`${API_URL}/analytics/production`)
      ]);
      setSummary(summaryRes.data);
      setProductionData(productionRes.data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const dates = Object.keys(productionData).slice(-7);
  const maxProduction = Math.max(...dates.map(d => productionData[d]?.produced || 0), 1);

  return (
    <div className="fade-in">
      <h2 className="mb-4">
        <i className="fas fa-chart-line me-2"></i>
        Analytics Dashboard
      </h2>

      {/* KPI Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <h3>{summary.totalEmployees}</h3>
            <p>Total Employees</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}>
            <h3>{summary.todayProduction}</h3>
            <p>Today's Production</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <h3>{summary.pendingReports}</h3>
            <p>Pending Reports</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <h3>{summary.efficiency}%</h3>
            <p>Efficiency Rate</p>
          </div>
        </div>
      </div>

      {/* Production Chart */}
      <div className="row">
        <div className="col-md-8">
          <div className="dashboard-card">
            <h5>Production Trend (Last 7 Days)</h5>
            <div className="chart-container">
              <div className="production-chart">
                {dates.map((date, idx) => {
                  const data = productionData[date] || { produced: 0, target: 0 };
                  const height = (data.produced / maxProduction) * 200;
                  return (
                    <div key={date} className="chart-bar-wrapper">
                      <div
                        className="chart-bar chart-bar-animated"
                        style={{
                          height: `${height}px`,
                          animationDelay: `${idx * 0.1}s`
                        }}
                      >
                        <span className="bar-label">{data.produced}</span>
                      </div>
                      <div className="chart-date">{date.slice(0, 5)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card">
            <h5>Performance Metrics</h5>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-1">
                <span>Efficiency</span>
                <span>{summary.efficiency}%</span>
              </div>
              <div className="progress" style={{ height: '20px' }}>
                <div
                  className="progress-bar bg-success progress-animated"
                  style={{ width: `${summary.efficiency}%` }}
                ></div>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-1">
                <span>Quality Rate</span>
                <span>{summary.qualityRate}%</span>
              </div>
              <div className="progress" style={{ height: '20px' }}>
                <div
                  className="progress-bar bg-info progress-animated"
                  style={{ width: `${summary.qualityRate}%` }}
                ></div>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-1">
                <span>Target Achievement</span>
                <span>87%</span>
              </div>
              <div className="progress" style={{ height: '20px' }}>
                <div
                  className="progress-bar bg-primary progress-animated"
                  style={{ width: '87%' }}
                ></div>
              </div>
            </div>
          </div>
          <div className="dashboard-card mt-4">
            <h5>Quick Stats</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span>Avg Pieces/Hour</span>
                <strong>180</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Defect Rate</span>
                <strong className="text-danger">2.5%</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Overtime Hours</span>
                <strong>45</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
