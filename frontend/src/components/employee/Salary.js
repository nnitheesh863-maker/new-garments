import React from 'react';

const Salary = () => {
  const currentMonth = {
    basePay: 15000,
    overtimePay: 2500,
    bonuses: {
      production: 500,
      quality: 300,
      attendance: 200
    },
    deductions: {
      tax: 1500,
      pf: 1800,
      insurance: 500
    }
  };

  const totalEarnings = currentMonth.basePay + currentMonth.overtimePay + 
    Object.values(currentMonth.bonuses).reduce((a, b) => a + b, 0);
  const totalDeductions = Object.values(currentMonth.deductions).reduce((a, b) => a + b, 0);
  const netPay = totalEarnings - totalDeductions;

  const paymentHistory = [
    { month: 'Jan 2024', amount: 16200, status: 'paid' },
    { month: 'Dec 2023', amount: 15800, status: 'paid' },
    { month: 'Nov 2023', amount: 15500, status: 'paid' },
    { month: 'Oct 2023', amount: 15300, status: 'paid' }
  ];

  return (
    <div className="fade-in">
      <h2 className="mb-4">Salary & Payments</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="dashboard-card">
            <h5>Current Month Salary</h5>
            <div className="salary-summary">
              <p><strong>Base Pay:</strong> ₹{currentMonth.basePay.toLocaleString()}</p>
              <p><strong>Overtime:</strong> ₹{currentMonth.overtimePay.toLocaleString()}</p>
              <hr />
              <p className="text-success"><strong>Production Bonus:</strong> ₹{currentMonth.bonuses.production}</p>
              <p className="text-success"><strong>Quality Bonus:</strong> ₹{currentMonth.bonuses.quality}</p>
              <p className="text-success"><strong>Attendance Bonus:</strong> ₹{currentMonth.bonuses.attendance}</p>
              <hr />
              <p><strong>Total Earnings:</strong> ₹{totalEarnings.toLocaleString()}</p>
              <p className="text-danger"><strong>Deductions:</strong> ₹{totalDeductions.toLocaleString()}</p>
              <h4 className="text-primary mt-3">Net Pay: ₹{netPay.toLocaleString()}</h4>
            </div>
          </div>
          <div className="dashboard-card mt-4">
            <h5>Deductions Breakdown</h5>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between">
                <span>Income Tax</span>
                <span>₹{currentMonth.deductions.tax}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Provident Fund (PF)</span>
                <span>₹{currentMonth.deductions.pf}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Insurance</span>
                <span>₹{currentMonth.deductions.insurance}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="dashboard-card">
            <h5>Payment History</h5>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment, idx) => (
                    <tr key={idx}>
                      <td>{payment.month}</td>
                      <td>₹{payment.amount.toLocaleString()}</td>
                      <td><span className="badge bg-success">{payment.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-card mt-4">
            <h5>Yearly Earnings</h5>
            <div className="row text-center">
              <div className="col-md-4">
                <div className="p-3 bg-light rounded">
                  <h4>₹1,85,000</h4>
                  <small>Total Earnings</small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 bg-light rounded">
                  <h4>₹24,000</h4>
                  <small>Total Deductions</small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 bg-light rounded">
                  <h4>₹1,61,000</h4>
                  <small>Net Income</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salary;
