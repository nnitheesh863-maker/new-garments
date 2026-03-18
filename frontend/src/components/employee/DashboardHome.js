import React from 'react';
import Garment3DAnimation from './Garment3DAnimation';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardHome = ({ stats }) => {
  // Production Overview Chart Data
  const productionChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Items Produced',
        data: [120, 135, 128, 142, 138, 115],
        backgroundColor: [
          'rgba(102, 126, 234, 0.9)',
          'rgba(118, 75, 162, 0.9)',
          'rgba(240, 147, 251, 0.9)',
          'rgba(250, 112, 154, 0.9)',
          'rgba(79, 172, 254, 0.9)',
          'rgba(67, 233, 123, 0.9)'
        ],
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
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
          <div className="dashboard-card glass-card">
            <h5>
              <i className="fas fa-chart-bar me-2"></i>
              Production Overview
            </h5>
            <div style={{ height: '280px' }}>
              <Bar data={productionChartData} options={chartOptions} />
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
