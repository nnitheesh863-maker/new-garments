import React, { useState } from 'react';

const Machines = () => {
  const [machines] = useState([
    { id: 'MACH001', name: 'Sewing Machine 1', type: 'Sewing', status: 'active', assigned: 'Ravi Kumar', maintenance: '2024-02-15' },
    { id: 'MACH002', name: 'Overlock Machine', type: 'Overlock', status: 'under-maintenance', assigned: '-', maintenance: '2024-02-10' },
    { id: 'MACH003', name: 'Sewing Machine 2', type: 'Sewing', status: 'active', assigned: 'Priya Devi', maintenance: '2024-02-20' },
    { id: 'MACH004', name: 'Embroidery Machine', type: 'Embroidery', status: 'idle', assigned: '-', maintenance: '2024-02-18' }
  ]);

  const [issues, setIssues] = useState([
    { id: 'ISS001', machine: 'MACH002', type: 'Calibration', status: 'in-progress', assigned: 'Technician A' },
    { id: 'ISS002', machine: 'MACH004', type: 'Software Error', status: 'pending', assigned: '-' }
  ]);

  return (
    <div className="fade-in">
      <h2 className="mb-4">Machine Management</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="dashboard-card">
            <h5>Machine Status</h5>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Machine ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Assigned To</th>
                    <th>Maintenance</th>
                  </tr>
                </thead>
                <tbody>
                  {machines.map(machine => (
                    <tr key={machine.id}>
                      <td>{machine.id}</td>
                      <td>{machine.name}</td>
                      <td>{machine.type}</td>
                      <td>
                        <span className={`badge bg-${
                          machine.status === 'active' ? 'success' :
                          machine.status === 'under-maintenance' ? 'warning' : 'secondary'
                        }`}>
                          {machine.status}
                        </span>
                      </td>
                      <td>{machine.assigned}</td>
                      <td>{machine.maintenance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-card mt-4">
            <h5>Issue Reports</h5>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Machine</th>
                    <th>Issue Type</th>
                    <th>Status</th>
                    <th>Assigned</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map(issue => (
                    <tr key={issue.id}>
                      <td>{issue.machine}</td>
                      <td>{issue.type}</td>
                      <td><span className={`badge bg-${issue.status === 'in-progress' ? 'info' : 'warning'}`}>{issue.status}</span></td>
                      <td>{issue.assigned}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card">
            <h5>Machine Summary</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span>Total Machines</span>
                <strong>{machines.length}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Active</span>
                <strong className="text-success">{machines.filter(m => m.status === 'active').length}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Under Maintenance</span>
                <strong className="text-warning">{machines.filter(m => m.status === 'under-maintenance').length}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Idle</span>
                <strong className="text-secondary">{machines.filter(m => m.status === 'idle').length}</strong>
              </li>
            </ul>
          </div>

          <div className="dashboard-card mt-4">
            <h5>Upcoming Maintenance</h5>
            <ul className="list-group list-group-flush">
              {machines.filter(m => m.status === 'active').slice(0, 3).map(machine => (
                <li key={machine.id} className="list-group-item d-flex justify-content-between">
                  <span>{machine.name}</span>
                  <small className="text-muted">{machine.maintenance}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Machines;
