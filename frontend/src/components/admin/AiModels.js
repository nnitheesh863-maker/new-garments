import React, { useState } from 'react';

const AiModels = () => {
  const [models, setModels] = useState([
    { id: 'ML001', name: 'Production Prediction', accuracy: '87%', lastTrained: '2024-01-20', status: 'active' },
    { id: 'ML002', name: 'Quality Detection', accuracy: '92%', lastTrained: '2024-01-22', status: 'active' },
    { id: 'ML003', name: 'Demand Forecasting', accuracy: '85%', lastTrained: '2024-01-18', status: 'training' },
    { id: 'ML004', name: 'Maintenance Prediction', accuracy: '89%', lastTrained: '2024-01-21', status: 'active' }
  ]);

  const retrainModel = (id) => {
    alert(`Retraining model ${id}...`);
  };

  return (
    <div className="fade-in">
      <h2 className="mb-4">AI Model Management</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="dashboard-card">
            <h5>ML Models</h5>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Model ID</th>
                    <th>Name</th>
                    <th>Accuracy</th>
                    <th>Last Trained</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map(model => (
                    <tr key={model.id}>
                      <td>{model.id}</td>
                      <td>{model.name}</td>
                      <td>{model.accuracy}</td>
                      <td>{model.lastTrained}</td>
                      <td>
                        <span className={`badge bg-${
                          model.status === 'active' ? 'success' :
                          model.status === 'training' ? 'warning' : 'secondary'
                        }`}>
                          {model.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => retrainModel(model.id)}>
                          Retrain
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-card mt-4">
            <h5>Prediction Logs</h5>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Model</th>
                    <th>Input</th>
                    <th>Prediction</th>
                    <th>Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2024-01-23 10:30</td>
                    <td>Production</td>
                    <td>Order #1234</td>
                    <td>1,200 pieces</td>
                    <td>87%</td>
                  </tr>
                  <tr>
                    <td>2024-01-23 09:15</td>
                    <td>Quality</td>
                    <td>Batch #B001</td>
                    <td>Grade A</td>
                    <td>92%</td>
                  </tr>
                  <tr>
                    <td>2024-01-23 08:45</td>
                    <td>Maintenance</td>
                    <td>Machine M001</td>
                    <td>Service due in 5 days</td>
                    <td>89%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card">
            <h5>Model Performance</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span>Total Models</span>
                <strong>{models.length}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Active</span>
                <strong className="text-success">{models.filter(m => m.status === 'active').length}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Training</span>
                <strong className="text-warning">{models.filter(m => m.status === 'training').length}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Avg Accuracy</span>
                <strong>88%</strong>
              </li>
            </ul>
          </div>

          <div className="dashboard-card mt-4">
            <h5>AI Features</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <i className="fas fa-chart-line text-primary me-2"></i>
                Production Prediction
              </li>
              <li className="list-group-item">
                <i className="fas fa-check-circle text-success me-2"></i>
                Quality Detection
              </li>
              <li className="list-group-item">
                <i className="fas fa-calendar text-warning me-2"></i>
                Demand Forecasting
              </li>
              <li className="list-group-item">
                <i className="fas fa-cog text-info me-2"></i>
                Maintenance Prediction
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiModels;
