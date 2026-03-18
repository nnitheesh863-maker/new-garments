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

  // Bar Chart - Garment-wise Production
  const garmentBarData = {
    labels: ['Shirts', 'Pants', 'Jackets', 'Dresses', 'T-Shirts'],
    datasets: [
      {
        label: 'Produced',
        data: Object.values(garmentData).map(g => g.produced),
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart - Garment Contribution
  const garmentPieData = {
    labels: ['Shirts', 'Pants', 'Jackets', 'Dresses', 'T-Shirts'],
    datasets: [
      {
        data: Object.values(garmentData).map(g => g.produced),
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

  // Line Chart - Factory Production Trend
  const productionLineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Total Production',
        data: [1600, 1800, 1750, 1920],
        fill: true,
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        borderColor: 'rgba(102, 126, 234, 1)',
        tension: 0.4,
      },
    ],
  };

  // Inventory Chart
  const inventoryData = {
    labels: ['Fabric', 'Thread', 'Buttons', 'Zippers', 'Labels'],
    datasets: [
      {
        label: 'Stock Level',
        data: [85, 45, 90, 70, 95],
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(67, 233, 123, 0.8)',
          'rgba(255, 193, 7, 0.8)',
          'rgba(79, 172, 254, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#1a1a2e',
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
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
      {
        label: 'Profit',
        data: Object.values(garmentData).map(g => g.profit),
        backgroundColor: 'rgba(67, 233, 123, 0.8)',
        borderColor: 'rgba(67, 233, 123, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: 'white' } }
    },
    scales: {
      x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } }
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
          <div className="stat-card">
            <h3>{totalProduction}</h3>
            <p>Total Production</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <h3>₹{(totalCost/1000).toFixed(1)}K</h3>
            <p>Total Cost</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <h3>₹{(totalProfit/1000).toFixed(1)}K</h3>
            <p>Total Profit</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <h3>{Math.round((totalProfit/totalCost)*100)}%</h3>
            <p>Profit Margin</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="dashboard-card">
            <h5>Garment-wise Production</h5>
            <div style={{ height: '250px' }}>
              <Bar data={garmentBarData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-card">
            <h5>Production Contribution</h5>
            <div style={{ height: '250px', display: 'flex', justifyContent: 'center' }}>
              <Pie data={garmentPieData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'right', labels: { color: 'white' } } } }} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-card">
            <h5>Inventory Analysis</h5>
            <div style={{ height: '250px', display: 'flex', justifyContent: 'center' }}>
              <Pie data={inventoryData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { position: 'right', labels: { color: 'white' } } } }} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-card">
            <h5>Cost vs Profit</h5>
            <div style={{ height: '250px' }}>
              <Bar data={costProfitData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-12 mb-4">
          <div className="dashboard-card">
            <h5>Factory Production Trend</h5>
            <div style={{ height: '200px' }}>
              <Line data={productionLineData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
