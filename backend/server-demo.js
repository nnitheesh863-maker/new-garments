const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from React frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// In-memory database for demo
const users = [
  {
    id: 'EMP001',
    employeeId: 'EMP001',
    name: 'Ravi Kumar',
    email: 'emp@test.com',
    password: bcrypt.hashSync('password', 10),
    role: 'employee',
    department: 'Production',
    phone: '9876543210'
  },
  {
    id: 'MGR001',
    employeeId: 'MGR001',
    name: 'Manager A',
    email: 'mgr@test.com',
    password: bcrypt.hashSync('password', 10),
    role: 'manager',
    department: 'Management',
    phone: '9876543211'
  },
  {
    id: 'ADM001',
    employeeId: 'ADM001',
    name: 'Admin User',
    email: 'admin@test.com',
    password: bcrypt.hashSync('password', 10),
    role: 'admin',
    department: 'IT',
    phone: '9876543212'
  }
];

const materials = [
  { id: 'MAT001', name: 'Cotton Fabric', type: 'fabric', stock: 1500, unit: 'meters', status: 'available' },
  { id: 'MAT002', name: 'Polyester Thread', type: 'thread', stock: 200, unit: 'spools', status: 'low-stock' },
  { id: 'MAT003', name: 'Buttons', type: 'button', stock: 5000, unit: 'pieces', status: 'available' }
];

const production = [
  { id: 'PROD001', orderId: 'ORD001', employeeId: 'EMP001', productType: 'Shirt', actualQuantity: 45, targetQuantity: 50, qualityGrade: 'A' },
  { id: 'PROD002', orderId: 'ORD002', employeeId: 'EMP001', productType: 'Pant', actualQuantity: 38, targetQuantity: 40, qualityGrade: 'B' }
];

// Auth Routes
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role, department, phone } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  const id = 'EMP' + Date.now().toString().slice(-6);
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  const newUser = {
    id,
    employeeId: id,
    name,
    email,
    password: hashedPassword,
    role: role || 'employee',
    department: department || '',
    phone: phone || ''
  };

  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully', employeeId: id });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email);
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    'demo-secret-key',
    { expiresIn: '24h' }
  );

  const userResponse = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    employeeId: user.employeeId,
    department: user.department
  };

  res.json({ token, user: userResponse });
});

// Employee Routes
app.get('/api/employees', (req, res) => {
  res.json(users.map(u => ({
    id: u.id,
    employeeId: u.employeeId,
    name: u.name,
    email: u.email,
    role: u.role,
    department: u.department,
    phone: u.phone
  })));
});

app.get('/api/employees/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id || u.employeeId === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Material Routes
app.get('/api/materials', (req, res) => {
  res.json(materials);
});

app.post('/api/materials', (req, res) => {
  const material = {
    id: 'MAT' + Date.now().toString().slice(-6),
    ...req.body,
    status: req.body.stock < 300 ? 'low-stock' : 'available'
  };
  materials.push(material);
  res.status(201).json(material);
});

// Production Routes
app.get('/api/production', (req, res) => {
  res.json(production);
});

app.post('/api/production', (req, res) => {
  const prod = {
    id: 'PROD' + Date.now().toString().slice(-6),
    ...req.body
  };
  production.push(prod);
  res.status(201).json(prod);
});

app.get('/api/production/employee/:id', (req, res) => {
  const employeeProduction = production.filter(p => p.employeeId === req.params.id);
  res.json(employeeProduction);
});

app.get('/api/production/daily-summary', (req, res) => {
  const summary = {
    totalProduced: production.reduce((sum, p) => sum + (p.actualQuantity || 0), 0),
    totalTarget: production.reduce((sum, p) => sum + (p.targetQuantity || 0), 0),
    totalRejected: 5,
    totalOrders: production.length
  };
  res.json(summary);
});

// Machine Routes
app.get('/api/machines', (req, res) => {
  res.json([
    { id: 'MACH001', name: 'Sewing Machine 1', type: 'Sewing', status: 'active', assignedEmployee: 'EMP001' },
    { id: 'MACH002', name: 'Overlock Machine', type: 'Overlock', status: 'under-maintenance', assignedEmployee: '-' }
  ]);
});

app.post('/api/machines/:id/report-issue', (req, res) => {
  res.json({ message: 'Issue reported successfully', machineId: req.params.id });
});

// Salary Routes
app.get('/api/salary/:employeeId', (req, res) => {
  res.json([
    { month: 'January', year: 2024, netPay: 16500, status: 'paid' },
    { month: 'December', year: 2023, netPay: 16200, status: 'paid' }
  ]);
});

// Leave Routes
app.get('/api/leaves/:employeeId', (req, res) => {
  res.json([
    { id: 'L001', type: 'sick', startDate: '2024-01-15', endDate: '2024-01-16', status: 'approved' }
  ]);
});

app.post('/api/leaves', (req, res) => {
  res.status(201).json({ message: 'Leave application submitted', id: 'L' + Date.now() });
});

// Report Routes
app.get('/api/reports/daily-production', (req, res) => {
  res.json(production);
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend available at http://localhost:${PORT}`);
  console.log(`✅ Using in-memory database for demo`);
});
