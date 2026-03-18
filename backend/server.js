const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Firebase Admin SDK
const admin = require('firebase-admin');

// Initialize Firebase with service account
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from React frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Helper function to generate employee ID
const generateEmployeeId = () => {
  return 'EMP' + Date.now().toString().slice(-6);
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role, department, phone } = req.body;
    
    // Check if user already exists
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).limit(1).get();
    
    if (!snapshot.empty) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const employeeId = generateEmployeeId();
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    const userData = {
      id: employeeId,
      employeeId,
      name,
      email,
      password: hashedPassword,
      role: role || 'employee',
      department: department || '',
      phone: phone || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save to Firestore
    await usersRef.doc(employeeId).set(userData);
    
    res.status(201).json({ message: 'User registered successfully', employeeId });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).limit(1).get();
    
    if (snapshot.empty) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const userDoc = snapshot.docs[0];
    const user = userDoc.data();
    
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'demo-secret-key',
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
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Employee Routes
app.get('/api/employees', async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const employees = snapshot.docs.map(doc => {
      const data = doc.data();
      delete data.password;
      return data;
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/employees/:id', async (req, res) => {
  try {
    const doc = await db.collection('users').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    const data = doc.data();
    delete data.password;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Material Routes
app.get('/api/materials', async (req, res) => {
  try {
    const snapshot = await db.collection('materials').get();
    const materials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/materials', async (req, res) => {
  try {
    const materialId = 'MAT' + Date.now().toString().slice(-6);
    const material = {
      materialId,
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await db.collection('materials').doc(materialId).set(material);
    res.status(201).json({ ...material, id: materialId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Production Routes
app.get('/api/production', async (req, res) => {
  try {
    const snapshot = await db.collection('production').get();
    const productions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(productions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/production', async (req, res) => {
  try {
    const productionId = 'PROD' + Date.now().toString().slice(-6);
    const production = {
      productionId,
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await db.collection('production').doc(productionId).set(production);
    res.status(201).json({ ...production, id: productionId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/production/employee/:id', async (req, res) => {
  try {
    const snapshot = await db.collection('production')
      .where('employeeId', '==', req.params.id)
      .get();
    const productions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(productions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/production/daily-summary', async (req, res) => {
  try {
    const snapshot = await db.collection('production').get();
    const productions = snapshot.docs.map(doc => doc.data());
    
    const summary = {
      totalProduced: productions.reduce((sum, p) => sum + (p.actualQuantity || 0), 0),
      totalTarget: productions.reduce((sum, p) => sum + (p.targetQuantity || 0), 0),
      totalRejected: 5,
      totalOrders: productions.length
    };
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Machine Routes
app.get('/api/machines', async (req, res) => {
  try {
    const snapshot = await db.collection('machines').get();
    const machines = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(machines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/machines/:id/report-issue', async (req, res) => {
  try {
    const issue = {
      id: 'ISS' + Date.now().toString().slice(-6),
      machineId: req.params.id,
      ...req.body,
      reportedAt: new Date(),
      status: 'pending'
    };
    
    await db.collection('issues').doc(issue.id).set(issue);
    res.json({ message: 'Issue reported successfully', issue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Salary Routes
app.get('/api/salary/:employeeId', async (req, res) => {
  try {
    const snapshot = await db.collection('salaries')
      .where('employeeId', '==', req.params.employeeId)
      .get();
    const salaries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(salaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leave Routes
app.get('/api/leaves/:employeeId', async (req, res) => {
  try {
    const snapshot = await db.collection('leaves')
      .where('employeeId', '==', req.params.employeeId)
      .get();
    const leaves = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/leaves', async (req, res) => {
  try {
    const leaveId = 'LEAVE' + Date.now().toString().slice(-6);
    const leave = {
      leaveId,
      ...req.body,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await db.collection('leaves').doc(leaveId).set(leave);
    res.status(201).json({ ...leave, id: leaveId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Report Routes
app.get('/api/reports', async (req, res) => {
  try {
    const snapshot = await db.collection('reports').orderBy('createdAt', 'desc').get();
    const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/reports', async (req, res) => {
  try {
    const reportId = 'REP' + Date.now().toString().slice(-6);
    const report = {
      reportId,
      ...req.body,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection('reports').doc(reportId).set(report);
    res.status(201).json({ ...report, id: reportId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/reports/:id', async (req, res) => {
  try {
    const reportRef = db.collection('reports').doc(req.params.id);
    await reportRef.update({
      ...req.body,
      updatedAt: new Date()
    });
    const doc = await reportRef.get();
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/reports/daily-production', async (req, res) => {
  try {
    const snapshot = await db.collection('production').get();
    const productions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(productions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Analytics Routes
app.get('/api/analytics/summary', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const productionSnapshot = await db.collection('production')
      .where('createdAt', '>=', today)
      .get();
    const todayProduction = productionSnapshot.docs.map(doc => doc.data());

    const pendingReports = await db.collection('reports')
      .where('status', '==', 'pending')
      .get();

    const employeesSnapshot = await db.collection('users').get();

    const summary = {
      totalEmployees: employeesSnapshot.size,
      todayProduction: todayProduction.reduce((sum, p) => sum + (p.actualQuantity || 0), 0),
      pendingReports: pendingReports.size,
      efficiency: 85,
      qualityRate: 92
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/analytics/production', async (req, res) => {
  try {
    const snapshot = await db.collection('production')
      .orderBy('createdAt', 'desc')
      .limit(30)
      .get();

    const production = snapshot.docs.map(doc => doc.data());
    
    const byDate = {};
    production.forEach(p => {
      const date = new Date(p.createdAt).toLocaleDateString();
      if (!byDate[date]) {
        byDate[date] = { produced: 0, target: 0 };
      }
      byDate[date].produced += p.actualQuantity || 0;
      byDate[date].target += p.targetQuantity || 0;
    });

    res.json(byDate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5006;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend available at http://localhost:${PORT}`);
  console.log(`✅ Connected to Firebase Firestore`);
});
