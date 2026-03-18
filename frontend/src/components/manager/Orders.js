import React, { useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 'ORD001', customer: 'Retail Corp', items: 500, produced: 450, deadline: '2024-02-01', status: 'in-progress' },
    { id: 'ORD002', customer: 'Fashion Plus', items: 300, produced: 300, deadline: '2024-01-28', status: 'completed' },
    { id: 'ORD003', customer: 'Style Mart', items: 200, produced: 120, deadline: '2024-02-05', status: 'in-progress' },
    { id: 'ORD004', customer: 'Trend Wear', items: 400, produced: 0, deadline: '2024-02-10', status: 'pending' }
  ]);

  const [newOrder, setNewOrder] = useState({
    customer: '',
    items: '',
    deadline: ''
  });

  const handleChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const createOrder = (e) => {
    e.preventDefault();
    const order = {
      id: 'ORD' + Date.now().toString().slice(-6),
      customer: newOrder.customer,
      items: parseInt(newOrder.items),
      produced: 0,
      deadline: newOrder.deadline,
      status: 'pending'
    };
    setOrders([order, ...orders]);
    setNewOrder({ customer: '', items: '', deadline: '' });
    alert('Order created successfully!');
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4">Order Management</h2>
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
                    <th>Deadline</th>
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
                        <td>
                          {order.produced} ({progress}%)
                          <div className="progress mt-1" style={{ height: '5px' }}>
                            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                          </div>
                        </td>
                        <td>{order.deadline}</td>
                        <td><span className={`badge bg-${order.status === 'completed' ? 'success' : order.status === 'in-progress' ? 'info' : 'warning'}`}>{order.status}</span></td>
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
            <h5>Create New Order</h5>
            <form onSubmit={createOrder}>
              <div className="mb-3">
                <label>Customer</label>
                <input type="text" name="customer" className="form-control" value={newOrder.customer} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label>Items</label>
                <input type="number" name="items" className="form-control" value={newOrder.items} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label>Deadline</label>
                <input type="date" name="deadline" className="form-control" value={newOrder.deadline} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary w-100">Create Order</button>
            </form>
          </div>

          <div className="dashboard-card mt-4">
            <h5>Order Summary</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span>Total Orders</span>
                <strong>{orders.length}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Completed</span>
                <strong className="text-success">{orders.filter(o => o.status === 'completed').length}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>In Progress</span>
                <strong className="text-info">{orders.filter(o => o.status === 'in-progress').length}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Pending</span>
                <strong className="text-warning">{orders.filter(o => o.status === 'pending').length}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
