import React, { useState } from 'react';
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

const ManagerAnalytics = () => {
  const [employees] = useState([
    { name: 'Ravi Kumar', stitched: 145, defective: 2, efficiency: 95 },
    { name: 'Priya Devi', stitched: 138, defective: 3, efficiency: 92 },
    { name: 'Suresh Babu', stitched: 125, defective: 5, efficiency: 85 },
    { name: 'Lakshmi Nair', stitched: 140, defective: 4, efficiency: 88 },
    { name: 'Kumar Raj', stitched: 132, defective: 6, efficiency: 82 },
  ]);

  // Bar Chart - Employee Performance
  const employeeBarData = {
    labels: employees.map(e => e.name.split(' ')[0]),
    datasets: [
      {
        label: 'Stitched Pieces',
        data: employees.map(e => e.stitched),
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 1,
      },
      {
        label: 'Defective',
        data: employees.map(e => e.defective),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart - Employee Contribution
  const pieData = {
    labels: employees.map(e => e.name.split(' ')[0]),
    datasets: [
      {
        data: employees.map(e => e.stitched),
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(118, 75, 162, 0.8)',
          'rgba(240, 147, 251, 0.8)',
          'rgba(67, 233, 123, 0.8)',
          'rgba(79, 172, 254, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#1a1a2e',
      },
    ],
  };

  // Line Chart - Total Production Trend
  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Total Production',
        data: [650, 720, 680, 750, 800, 780, 700],
        fill: true,
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        borderColor: 'rgba(102, 126, 234, 1)',
        tension: 0.4,
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
          'rgba(239, 68, 68, 0.8)',
          'rgba(255, 193, 7, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(201, 203, 207, 0.8)',
          'rgba(54, 162, 235, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#1a1a2e',
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
        <i className="fas fa-chart-line me-2"></i>
        Manager Analytics
      </h2>

      {/* KPI Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="stat-card">
            <h3>{employees.length}</h3>
            <p>Team Members</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <h3>{employees.reduce((sum, e) => sum + e.stitched, 0)}</h3>
            <p>Total Stitched</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <h3>{employees.reduce((sum, e) => sum + e.defective, 0)}</h3>
            <p>Total Defects</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <h3>{Math.round(employees.reduce((sum, e) => sum + e.efficiency, 0) / employees.length)}%</h3>
            <p>Avg Efficiency</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="dashboard-card">
            <h5>Employee Performance</h5>
            <div style={{ height: '250px' }}>
              <Bar data={employeeBarData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-card">
            <h5>Production Contribution</h5>
            <div style={{ height: '250px', display: 'flex', justifyContent: 'center' }}>
              <Pie data={pieData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'right', labels: { color: 'white' } } } }} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-card">
            <h5>Defect Analysis</h5>
            <div style={{ height: '250px', display: 'flex', justifyContent: 'center' }}>
              <Pie data={defectData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'right', labels: { color: 'white' } } } }} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-card">
            <h5>Production Trend (Weekly)</h5>
            <div style={{ height: '250px' }}>
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerAnalytics;
