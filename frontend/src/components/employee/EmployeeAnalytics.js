import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler } from 'chart.js';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';

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

const EmployeeAnalytics = () => {
  const [analytics] = useState({
    materialsReceived: 150,
    piecesStitched: 145,
    defectivePieces: 5,
    timeSpent: 8.5,
    efficiency: 92
  });

  // Attractive gradient colors
  const gradientColors = {
    primary: 'rgba(102, 126, 234, 0.8)',
    secondary: 'rgba(118, 75, 162, 0.8)',
    success: 'rgba(67, 233, 123, 0.8)',
    warning: 'rgba(255, 193, 7, 0.8)',
    danger: 'rgba(239, 68, 68, 0.8)',
    info: 'rgba(79, 172, 254, 0.8)',
    pink: 'rgba(240, 147, 251, 0.8)',
    coral: 'rgba(250, 112, 154, 0.8)'
  };

  // Bar Chart Data - Material vs Stitched with gradient
  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Materials Received',
        data: [20, 25, 22, 28, 30],
        backgroundColor: [
          'rgba(102, 126, 234, 0.9)',
          'rgba(118, 75, 162, 0.9)',
          'rgba(240, 147, 251, 0.9)',
          'rgba(250, 112, 154, 0.9)',
          'rgba(239, 68, 68, 0.9)'
        ],
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Pieces Stitched',
        data: [18, 23, 20, 26, 28],
        backgroundColor: [
          'rgba(67, 233, 123, 0.9)',
          'rgba(79, 172, 254, 0.9)',
          'rgba(102, 126, 234, 0.9)',
          'rgba(118, 75, 162, 0.9)',
          'rgba(240, 147, 251, 0.9)'
        ],
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  // Pie Chart Data - Work Distribution
  const pieChartData = {
    labels: ['Completed ✓', 'Pending ⏳', 'Defective ✗'],
    datasets: [
      {
        data: [85, 10, 5],
        backgroundColor: [
          'rgba(67, 233, 123, 0.9)',
          'rgba(255, 193, 7, 0.9)',
          'rgba(239, 68, 68, 0.9)',
        ],
        borderWidth: 3,
        borderColor: 'rgba(26, 26, 46, 0.8)',
        hoverOffset: 15,
      },
    ],
  };

  // Line Chart Data - Performance Over Time with gradient fill
  const lineChartData = {
    labels: ['8AM', '10AM', '12PM', '2PM', '4PM', '6PM'],
    datasets: [
      {
        label: 'Efficiency %',
        data: [85, 88, 92, 90, 88, 85],
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
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
        pointHoverRadius: 8,
      },
    ],
  };

  // Doughnut Chart - Time Distribution
  const doughnutData = {
    labels: ['Stitching', 'Material', 'Quality Check', 'Break'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          'rgba(102, 126, 234, 0.9)',
          'rgba(240, 147, 251, 0.9)',
          'rgba(67, 233, 123, 0.9)',
          'rgba(255, 193, 7, 0.9)',
        ],
        borderWidth: 3,
        borderColor: 'rgba(26, 26, 46, 0.8)',
        hoverOffset: 10,
      },
    ],
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
        displayColors: true
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
        Employee Analytics
      </h2>

      {/* KPI Cards with Gradient */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="stat-card" style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)'
          }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>{analytics.materialsReceived}</h3>
                <p>Materials Received</p>
              </div>
              <i className="fas fa-box-open fa-2x opacity-50"></i>
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
                <h3>{analytics.piecesStitched}</h3>
                <p>Pieces Stitched</p>
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
                <h3>{analytics.defectivePieces}</h3>
                <p>Defective Pieces</p>
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
                <h3>{analytics.efficiency}%</h3>
                <p>Efficiency Rate</p>
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
              <i className="fas fa-exchange-alt me-2"></i>
              Material vs Stitched Output
            </h5>
            <div style={{ height: '280px' }}>
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-card glass-card">
            <h5>
              <i className="fas fa-chart-pie me-2"></i>
              Work Distribution
            </h5>
            <div style={{ height: '280px', display: 'flex', justifyContent: 'center' }}>
              <Pie data={pieChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'right', labels: { color: 'white', font: { size: 12 } } } } }} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-card glass-card">
            <h5>
              <i className="fas fa-clock me-2"></i>
              Time Distribution
            </h5>
            <div style={{ height: '280px', display: 'flex', justifyContent: 'center' }}>
              <Doughnut data={doughnutData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'right', labels: { color: 'white', font: { size: 12 } } } } }} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-card glass-card">
            <h5>
              <i className="fas fa-chart-area me-2"></i>
              Performance Trend (Hourly)
            </h5>
            <div style={{ height: '280px' }}>
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAnalytics;
