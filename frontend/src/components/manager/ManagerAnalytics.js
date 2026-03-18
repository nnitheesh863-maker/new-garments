import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const ManagerAnalytics = () => {
  const [employees] = useState([
    { name: 'Ravi Kumar', stitched: 145, defective: 2, efficiency: 95 },
    { name: 'Priya Devi', stitched: 138, defective: 3, efficiency: 92 },
    { name: 'Suresh Babu', stitched: 125, defective: 5, efficiency: 85 },
    { name: 'Lakshmi Nair', stitched: 140, defective: 4, efficiency: 88 },
    { name: 'Kumar Raj', stitched: 132, defective: 6, efficiency: 82 },
  ]);

  // Attractive colors
  const colors = [
    'rgba(102, 126, 234, 0.9)',
    'rgba(118, 75, 162, 0.9)',
    'rgba(240, 147, 251, 0.9)',
    'rgba(67, 233, 123, 0.9)',
    'rgba(79, 172, 254, 0.9)'
  ];

  // Bar Chart - Employee Performance
  const employeeBarData = {
    labels: employees.map(e => e.name.split(' ')[0]),
    datasets: [
      {
        label: 'Stitched Pieces',
        data: employees.map(e => e.stitched),
        backgroundColor: colors,
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Defective',
        data: employees.map(e => e.defective),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  // Pie Chart - Employee Contribution
  const pieData = {
    labels: employees.map(e => e.name.split(' ')[0]),
    datasets: [
      {
        data: employees.map(e => e.stitched),
        backgroundColor: colors,
        borderWidth: 3,
        borderColor: 'rgba(26, 26, 46, 0.8)',
        hoverOffset: 15,
      },
    ],
  };

  // Line Chart - Total Production Trend with gradient
  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Total Production',
        data: [650, 720, 680, 750, 800, 780, 700],
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 250);
          gradient.addColorStop(0, 'rgba(102, 126, 234, 0.5)');
          gradient.addColorStop(1, 'rgba(102, 126, 234, 0)');
          return gradient;
        },
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: 'rgba(102, 126, 234, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  // Defect Analysis Chart
  const defectData = {
    labels: ['Stitching', 'Size', 'Color', 'Material', 'Other'],
    datasets: [
      {
        label: 'Defects by Type',
        data: [45, 30, 15, 8, 2],
        backgroundColor: [
          'rgba(239, 68, 68, 0.9)',
          'rgba(255, 193, 7, 0.9)',
          'rgba(255, 159, 64, 0.9)',
          'rgba(201, 203, 207, 0.9)',
          'rgba(54, 162, 235, 0.9)',
        ],
        borderWidth: 3,
        borderColor: 'rgba(26, 26, 46, 0.8)',
        hoverOffset: 10,
      },
    ],
  };

  // Efficiency Heatmap Simulation (Bar chart alternative)
  const efficiencyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: employees.slice(0, 4).map((emp, idx) => ({
      label: emp.name.split(' ')[0],
      data: [emp.efficiency - 5, emp.efficiency - 2, emp.efficiency, emp.efficiency - 1, emp.efficiency - 3],
      backgroundColor: colors[idx],
      borderWidth: 0,
      borderRadius: 4,
    }))
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { 
          color: 'rgba(255, 255, 255, 0.9)',
          font: { size: 12, family: "'Segoe UI', sans-serif" },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 46, 0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 10,
      }
    },
    scales: {
      x: { 
        ticks: { color: 'rgba(255, 255, 255, 0.8)', font: { size: 11 } },
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      y: { 
        ticks: { color: 'rgba(255, 255, 255, 0.8)', font: { size: 11 } },
        grid: { color: 'rgba(255,255,255,0.05)' }
      }
    }
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4">
        <i className="fas fa-chart-line me-2"></i>
        Manager Analytics
      </h2>

      {/* KPI Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="stat-card" style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)'
          }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>{employees.length}</h3>
                <p>Team Members</p>
              </div>
              <i className="fas fa-users fa-2x opacity-50"></i>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ 
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            boxShadow: '0 8px 32px rgba(67, 233, 123, 0.4)'
          }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>{employees.reduce((sum, e) => sum + e.stitched, 0)}</h3>
                <p>Total Stitched</p>
              </div>
              <i className="fas fa-tshirt fa-2x opacity-50"></i>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            boxShadow: '0 8px 32px rgba(240, 147, 251, 0.4)'
          }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>{employees.reduce((sum, e) => sum + e.defective, 0)}</h3>
                <p>Total Defects</p>
              </div>
              <i className="fas fa-exclamation-triangle fa-2x opacity-50"></i>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ 
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            boxShadow: '0 8px 32px rgba(79, 172, 254, 0.4)'
          }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>{Math.round(employees.reduce((sum, e) => sum + e.efficiency, 0) / employees.length)}%</h3>
                <p>Avg Efficiency</p>
              </div>
              <i className="fas fa-chart-line fa-2x opacity-50"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="dashboard-card glass-card">
            <h5>
              <i className="fas fa-users-cog me-2"></i>
              Employee Performance
            </h5>
            <div style={{ height: '280px' }}>
              <Bar data={employeeBarData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-card glass-card">
            <h5>
              <i className="fas fa-chart-pie me-2"></i>
              Production Contribution
            </h5>
            <div style={{ height: '280px', display: 'flex', justifyContent: 'center' }}>
              <Pie data={pieData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'right', labels: { color: 'white', font: { size: 12 } } } } }} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-card glass-card">
            <h5>
              <i className="fas fa-exclamation-circle me-2"></i>
              Defect Analysis
            </h5>
            <div style={{ height: '280px', display: 'flex', justifyContent: 'center' }}>
              <Pie data={defectData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'right', labels: { color: 'white', font: { size: 12 } } } } }} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-card glass-card">
            <h5>
              <i className="fas fa-chart-area me-2"></i>
              Weekly Production Trend
            </h5>
            <div style={{ height: '280px' }}>
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-12 mb-4">
          <div className="dashboard-card glass-card">
            <h5>
              <i className="fas fa-sliders-h me-2"></i>
              Efficiency by Employee (Daily)
            </h5>
            <div style={{ height: '250px' }}>
              <Bar data={efficiencyData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerAnalytics;
