import React, { useState } from 'react';

const MasterData = () => {
  const [activeTab, setActiveTab] = useState('products');

  const products = [
    { id: 'P001', name: 'Cotton Shirt', type: 'Shirt', price: 500 },
    { id: 'P002', name: 'Denim Pants', type: 'Pant', price: 800 },
    { id: 'P003', name: 'Winter Jacket', type: 'Jacket', price: 2500 }
  ];

  const materials = [
    { id: 'M001', name: 'Cotton Fabric', unit: 'meter', cost: 150 },
    { id: 'M002', name: 'Polyester Thread', unit: 'spool', cost: 50 },
    { id: 'M003', name: 'Buttons', unit: 'piece', cost: 2 }
  ];

  const machines = [
    { id: 'MAC001', name: 'Sewing Machine', type: 'Sewing', capacity: '100 pieces/hour' },
    { id: 'MAC002', name: 'Overlock Machine', type: 'Overlock', capacity: '150 pieces/hour' }
  ];

  return (
    <div className="fade-in">
      <h2 className="mb-4">Master Data Management</h2>
      <div className="row">
        <div className="col-md-3">
          <div className="dashboard-card">
            <ul className="nav nav-pills flex-column">
              <li className="nav-item mb-2">
                <button className={`nav-link w-100 ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
                  <i className="fas fa-tshirt me-2"></i> Products
                </button>
              </li>
              <li className="nav-item mb-2">
                <button className={`nav-link w-100 ${activeTab === 'materials' ? 'active' : ''}`} onClick={() => setActiveTab('materials')}>
                  <i className="fas fa-box me-2"></i> Materials
                </button>
              </li>
              <li className="nav-item mb-2">
                <button className={`nav-link w-100 ${activeTab === 'machines' ? 'active' : ''}`} onClick={() => setActiveTab('machines')}>
                  <i className="fas fa-cogs me-2"></i> Machines
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          <div className="dashboard-card">
            {activeTab === 'products' && (
              <>
                <h5>Product Catalog</h5>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id}>
                          <td>{p.id}</td>
                          <td>{p.name}</td>
                          <td>{p.type}</td>
                          <td>₹{p.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {activeTab === 'materials' && (
              <>
                <h5>Material Master</h5>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Unit</th>
                        <th>Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {materials.map(m => (
                        <tr key={m.id}>
                          <td>{m.id}</td>
                          <td>{m.name}</td>
                          <td>{m.unit}</td>
                          <td>₹{m.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {activeTab === 'machines' && (
              <>
                <h5>Machine Master</h5>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Capacity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {machines.map(m => (
                        <tr key={m.id}>
                          <td>{m.id}</td>
                          <td>{m.name}</td>
                          <td>{m.type}</td>
                          <td>{m.capacity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterData;
