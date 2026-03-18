import React from 'react';

const Compliance = () => {
  return (
    <div className="fade-in">
      <h2 className="mb-4">Compliance & Audit</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="dashboard-card">
            <h5>Regulatory Compliance</h5>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Regulation</th>
                    <th>Requirement</th>
                    <th>Status</th>
                    <th>Last Audit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Labor Laws</td>
                    <td>Minimum wage compliance</td>
                    <td><span className="badge bg-success">Compliant</span></td>
                    <td>2024-01-15</td>
                  </tr>
                  <tr>
                    <td>Tax Regulations</td>
                    <td>Income tax & GST filing</td>
                    <td><span className="badge bg-success">Compliant</span></td>
                    <td>2024-01-20</td>
                  </tr>
                  <tr>
                    <td>PF/ESI</td>
                    <td>Provident fund contributions</td>
                    <td><span className="badge bg-success">Compliant</span></td>
                    <td>2024-01-10</td>
                  </tr>
                  <tr>
                    <td>ISO Certification</td>
                    <td>Quality standards</td>
                    <td><span className="badge bg-warning">Renewal Due</span></td>
                    <td>2023-12-01</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-card mt-4">
            <h5>Audit Schedule</h5>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Audit Type</th>
                    <th>Scheduled Date</th>
                    <th>Responsible</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Internal Audit</td>
                    <td>2024-02-01</td>
                    <td>Compliance Officer</td>
                    <td><span className="badge bg-info">Scheduled</span></td>
                  </tr>
                  <tr>
                    <td>ISO Surveillance</td>
                    <td>2024-03-15</td>
                    <td>Quality Manager</td>
                    <td><span className="badge bg-info">Scheduled</span></td>
                  </tr>
                  <tr>
                    <td>Tax Audit</td>
                    <td>2024-04-01</td>
                    <td>Finance Dept</td>
                    <td><span className="badge bg-info">Scheduled</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card">
            <h5>Compliance Status</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span>Total Regulations</span>
                <strong>15</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Compliant</span>
                <strong className="text-success">13</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Warning</span>
                <strong className="text-warning">1</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Non-Compliant</span>
                <strong className="text-danger">1</strong>
              </li>
            </ul>
          </div>

          <div className="dashboard-card mt-4">
            <h5>Training Compliance</h5>
            <div className="mb-3">
              <p>Safety Training</p>
              <div className="progress">
                <div className="progress-bar bg-success" style={{ width: '95%' }}>95%</div>
              </div>
            </div>
            <div className="mb-3">
              <p>Quality Standards</p>
              <div className="progress">
                <div className="progress-bar bg-success" style={{ width: '88%' }}>88%</div>
              </div>
            </div>
            <div className="mb-3">
              <p>Machine Safety</p>
              <div className="progress">
                <div className="progress-bar bg-warning" style={{ width: '72%' }}>72%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
