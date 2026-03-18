import React, { useState } from 'react';

const Production = () => {
  const [productionData] = useState({
    today: { output: 1250, target: 1500, efficiency: 83 },
    week: { output: 8500, target: 9500, efficiency: 89 },
    month: { output: 32000, target: 38000, efficiency: 84 }
  });

  const [orders] = useState([
    { id: 'ORD001', customer: 'Retail Corp', items: 500, produced: 450, status: 'in-progress' },
    { id: 'ORD002', customer: 'Fashion Plus', items: 300, produced: 300, status: 'completed' },
    { id: 'ORD003', customer: 'Style Mart', items: 200, produced: 120, status: 'in-progress' }
  ]);

  return (
    <div className="fade-in">
      <h2 className="mb-4">Production Monitoring</h2>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="stat-card">
            <h3>{productionData.today.output}</h3>
            <p>Today's Output</p>
            <small>Target: {productionData.today.target}</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}>
            <h3>{productionData.today.efficiency}%</h3>
            <p>Efficiency</p>
            <small>Weekly: {productionData.week.efficiency}%</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <h3>{orders.filter(o => o.status === 'in-progress').length}</h3>
            <p>Active Orders</p>
            <small>Total: {orders.length}</small>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="dashboard-card">
            <h5>Active Orders</h5>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Produced</th>
                    <th>Progress</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => {
                    const progress = Math.round((order.produced / order.items) * 100);
                    return (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.items}</td>
                        <td>{order.produced}</td>
                        <td>
                          <div className="progress" style={{ height: '20px' }}>
                            <div className="progress-bar" style={{ width: `${progress}%` }}>{progress}%</div>
                          </div>
                        </td>
                        <td><span className={`badge bg-${order.status === 'completed' ? 'success' : 'info'}`}>{order.status}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card">
            <h5>Production Breakdown</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span>Line 1</span>
                <strong>420 pieces</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Line 2</span>
                <strong>380 pieces</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Line 3</span>
                <strong>350 pieces</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Line 4</span>
                <strong>100 pieces</strong>
              </li>
            </ul>
          </div>
          <div className="dashboard-card mt-4">
            <h5>Alerts</h5>
            <div className="alert alert-warning mb-2">
              <small>Line 4 below target by 50%</small>
            </div>
            <div className="alert alert-info">
              <small>Maintenance due for MACH002</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Production;
