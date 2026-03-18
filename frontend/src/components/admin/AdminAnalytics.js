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

const AdminAnalytics = () => {
  const [garmentData] = useState({
    shirts: { produced: 450, cost: 45000, profit: 22500 },
    pants: { produced: 380, cost: 57000, profit: 28500 },
    jackets: { produced: 220, cost: 88000, profit: 44000 },
    dresses: { produced: 320, cost: 64000, profit: 32000 },
    tshirts: { produced: 550, cost: 27500, profit: 13750 },
  });

  const totalProduction = Object.values(garmentData).reduce((sum, g) => sum + g.produced, 0);
  const totalCost = Object.values(garmentData).reduce((sum, g) => sum + g.cost, 0);
  const totalProfit = Object.values(garmentData).reduce((sum, g) => sum + g.profit, 0);

  // Attractive colors
  const colors = [
    'rgba(102, 126, 234, 0.9)',
    'rgba(118, 75, 162, 0.9)',
    'rgba(240, 147, 251, 0.9)',
    'rgba(67, 233, 123, 0.9)',
    'rgba(79, 172, 254, 0.9)'
  ];

  // Bar Chart - Garment-wise Production
  const garmentBarData = {
    labels: ['Shirts', 'Pants', 'Jackets', 'Dresses', 'T-Shirts'],
    datasets: [
      {
        label: 'Produced',
        data: Object.values(garmentData).map(g => g.produced),
        backgroundColor: colors,
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  // Pie Chart - Garment Contribution
  const garmentPieData = {
    labels: ['Shirts', 'Pants', 'Jackets', 'Dresses', 'T-Shirts'],
    datasets: [
      {
        data: Object.values(garmentData).map(g => g.produced),
        backgroundColor: colors,
        borderWidth: 3,
        borderColor: 'rgba(26, 26, 46, 0.8)',
        hoverOffset: 15,
      },
    ],
  };

  // Line Chart - Factory Production Trend with gradient
  const productionLineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Total Production',
        data: [1600, 1800, 1750, 1920],
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
      },
    ],
  };

  // Inventory Chart - Doughnut
  const inventoryData = {
    labels: ['Fabric', 'Thread', 'Buttons', 'Zippers', 'Labels'],
    datasets: [
      {
        label: 'Stock Level',
        data: [85, 45, 90, 70, 95],
        backgroundColor: [
          'rgba(102, 126, 234, 0.9)',
          'rgba(239, 68, 68, 0.9)',
          'rgba(67, 233, 123, 0.9)',
          'rgba(255, 193, 7, 0.9)',
          'rgba(79, 172, 254, 0.9)',
        ],
        borderWidth: 3,
        borderColor: 'rgba(26, 26, 46, 0.8)',
        hoverOffset: 10,
      },
    ],
  };

  // Cost vs Profit Chart
  const costProfitData = {
    labels: ['Shirts', 'Pants', 'Jackets', 'Dresses', 'T-Shirts'],
    datasets: [
      {
        label: 'Cost',
        data: Object.values(garmentData).map(g => g.cost),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Profit',
        data: Object.values(garmentData).map(g => g.profit),
        backgroundColor: 'rgba(67, 233, 123, 0.8)',
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  // Monthly Performance Line Chart
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [45000, 52000, 48000, 55000, 58000, 62000],
        fill: false,
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: 'rgba(102, 126, 234, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
      {
        label: 'Expenses',
        data: [30000, 32000, 31000, 33000, 35000, 36000],
        fill: false,
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: 'rgba(239, 68, 68, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
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
        <i className="fas fa-chart-pie me-2"></i>
        Admin Analytics
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
                <h3>{totalProduction}</h3>
                <p>Total Production</p>
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
                <h3>₹{(totalCost/1000).toFixed(1)}K</h3>
                <p>Total Cost</p>
              </div>
              <i className="fas fa-rupee-sign fa-2x opacity-50"></i>
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
                <h3>₹{(totalProfit/1000).toFixed(1)}K</h3>
                <p>Total Profit</p>
              </div>
              <i className="fas fa-chart-line fa-2x opacity-50"></i>
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
                <h3>{Math.round((totalProfit/totalCost)*100)}%</h3>
                <p>Profit Margin</p>
              </div>
              <i className="fas fa-percentage fa-2x opacity-50"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="dashboard-card glass-card">
            <h5>
              <i className="fas fa-boxes me-2"></i>
              Garment-wise Production
            </h5>
            <div style={{ height: '280px' }}>
              <Bar data={garmentBarData} options={chartOptions} />
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
              <Pie data={garmentPieData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'right', labels: { color: 'white', font: { size: 12 } } } } }} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-card glass-card">
            <h5>
              <i className="fas fa-box-open me-2"></i>
              Inventory Analysis
            </h5>
            <div style={{ height: '280px', display: 'flex', justifyContent: 'center' }}>
              <Doughnut data={inventoryData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'right', labels: { color: 'white', font: { size: 12 } } } } }} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-card glass-card">
            <h5>
              <i className="fas fa-money-bill-wave me-2"></i>
              Cost vs Profit
            </h5>
            <div style={{ height: '280px' }}>
              <Bar data={costProfitData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-card glass-card">
            <h5>
              <i className="fas fa-chart-area me-2"></i>
              Factory Production Trend
            </h5>
            <div style={{ height: '250px' }}>
              <Line data={productionLineData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-card glass-card">
            <h5>
              <i className="fas fa-chart-line me-2"></i>
              Monthly Performance
            </h5>
            <div style={{ height: '250px' }}>
              <Line data={monthlyData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
