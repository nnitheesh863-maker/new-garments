import React, { useState } from 'react';

const Quality = () => {
  const [qualityData] = useState({
    overallDefectRate: 4.5,
    gradeA: 85,
    gradeB: 10,
    gradeC: 5
  });

  const [defects] = useState([
    { type: 'Stitching Error', count: 15, percentage: 45 },
    { type: 'Size Issue', count: 10, percentage: 30 },
    { type: 'Color Variance', count: 5, percentage: 15 },
    { type: 'Material Defect', count: 3, percentage: 10 }
  ]);

  return (
    <div className="fade-in">
      <h2 className="mb-4">Quality Management</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="dashboard-card">
            <h5>Quality Overview</h5>
            <div className="row text-center">
              <div className="col-6 mb-3">
                <div className="p-3 bg-light rounded">
                  <h3 className="text-success">{qualityData.gradeA}%</h3>
                  <small>Grade A</small>
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="p-3 bg-light rounded">
                  <h3 className="text-warning">{qualityData.gradeB}%</h3>
                  <small>Grade B</small>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 bg-light rounded">
                  <h3 className="text-danger">{qualityData.gradeC}%</h3>
                  <small>Grade C</small>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 bg-light rounded">
                  <h3 className="text-primary">{qualityData.overallDefectRate}%</h3>
                  <small>Defect Rate</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="dashboard-card">
            <h5>Defect Analysis</h5>
            <ul className="list-group list-group-flush">
              {defects.map((defect, idx) => (
                <li key={idx} className="list-group-item">
                  <div className="d-flex justify-content-between mb-1">
                    <span>{defect.type}</span>
                    <span>{defect.count} ({defect.percentage}%)</span>
                  </div>
                  <div className="progress" style={{ height: '10px' }}>
                    <div className="progress-bar bg-danger" style={{ width: `${defect.percentage}%` }}></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-8">
          <div className="dashboard-card">
            <h5>Quality Inspection Schedule</h5>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Inspector</th>
                    <th>Department</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2024-01-25</td>
                    <td>Inspector A</td>
                    <td>Production</td>
                    <td><span className="badge bg-success">Completed</span></td>
                  </tr>
                  <tr>
                    <td>2024-01-28</td>
                    <td>Inspector B</td>
                    <td>Finishing</td>
                    <td><span className="badge bg-warning">Pending</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card">
            <h5>Improvement Tips</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Review stitching tension settings</li>
              <li className="list-group-item">Check fabric quality before use</li>
              <li className="list-group-item">Calibrate machines regularly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quality;
