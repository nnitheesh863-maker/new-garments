import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
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
  LineElement
);

const EmployeeAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    materialsReceived: 150,
    piecesStitched: 145,
    defectivePieces: 5,
    timeSpent: 8.5,
    efficiency: 92
  });

  // Bar Chart Data - Material vs Stitched
  const barChartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Materials Received',
        data: [20, 25, 22, 28, 30],
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 1,
      },
      {
        label: 'Pieces Stitched',
        data: [18, 23, 20, 26, 28],
        backgroundColor: 'rgba(118, 75, 162, 0.8)',
        borderColor: 'rgba(118, 75, 162, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart Data - Work Distribution
  const pieChartData = {
    labels: ['Completed', 'Pending', 'Defective'],
    datasets: [
      {
        data: [85, 10, 5],
        backgroundColor: [
          'rgba(67, 233, 123, 0.8)',
          'rgba(255, 193, 7, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#1a1a2e',
      },
    ],
  };

  // Line Chart Data - Performance Over Time
  const lineChartData = {
    labels: ['8AM', '10AM', '12PM', '2PM', '4PM', '6PM'],
    datasets: [
      {
        label: 'Efficiency %',
        data: [85, 88, 92, 90, 88, 85],
        fill: true,
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        borderColor: 'rgba(102, 126, 234, 1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: 'white' }
      }
    },
    scales: {
      x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } }
    }
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4">
        <i className="fas fa-chart-bar me-2"></i>
        Employee Analytics
      </h2>

      {/* KPI Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="stat-card">
            <h3>{analytics.materialsReceived}</h3>
            <p>Materials Received</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <h3>{analytics.piecesStitched}</h3>
            <p>Pieces Stitched</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <h3>{analytics.defectivePieces}</h3>
            <p>Defective Pieces</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <h3>{analytics.efficiency}%</h3>
            <p>Efficiency</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="dashboard-card">
            <h5>Material vs Stitched Output</h5>
            <div style={{ height: '250px' }}>
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-card">
            <h5>Work Distribution</h5>
            <div style={{ height: '250px', display: 'flex', justifyContent: 'center' }}>
              <Pie data={pieChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'right', labels: { color: 'white' } } } }} />
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="dashboard-card">
            <h5>Performance Trend (Hourly)</h5>
            <div style={{ height: '200px' }}>
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAnalytics;
