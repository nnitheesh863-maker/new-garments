// Firebase Initialization Script
// Run this once to populate the database with sample data

const admin = require('firebase-admin');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Initialize Firebase
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

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
});

const db = admin.firestore();

const sampleData = {
  users: [
    {
      id: 'EMP001',
      employeeId: 'EMP001',
      name: 'Ravi Kumar',
      email: 'emp@test.com',
      password: bcrypt.hashSync('password', 10),
      role: 'employee',
      department: 'Production',
      phone: '9876543210',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'MGR001',
      employeeId: 'MGR001',
      name: 'Manager A',
      email: 'mgr@test.com',
      password: bcrypt.hashSync('password', 10),
      role: 'manager',
      department: 'Management',
      phone: '9876543211',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'ADM001',
      employeeId: 'ADM001',
      name: 'Admin User',
      email: 'admin@test.com',
      password: bcrypt.hashSync('password', 10),
      role: 'admin',
      department: 'IT',
      phone: '9876543212',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  materials: [
    {
      materialId: 'MAT001',
      name: 'Cotton Fabric',
      type: 'fabric',
      quantity: 1500,
      unit: 'meters',
      stock: 1500,
      status: 'available',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      materialId: 'MAT002',
      name: 'Polyester Thread',
      type: 'thread',
      quantity: 200,
      unit: 'spools',
      stock: 200,
      status: 'low-stock',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      materialId: 'MAT003',
      name: 'Buttons',
      type: 'button',
      quantity: 5000,
      unit: 'pieces',
      stock: 5000,
      status: 'available',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  machines: [
    {
      machineId: 'MACH001',
      name: 'Sewing Machine 1',
      type: 'Sewing',
      status: 'active',
      assignedEmployee: 'EMP001',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      machineId: 'MACH002',
      name: 'Overlock Machine',
      type: 'Overlock',
      status: 'under-maintenance',
      assignedEmployee: '-',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
};

async function initializeDatabase() {
  console.log('🚀 Initializing Firebase Database...');
  
  try {
    // Add users
    for (const user of sampleData.users) {
      await db.collection('users').doc(user.id).set(user);
      console.log(`✅ User added: ${user.name} (${user.email})`);
    }

    // Add materials
    for (const material of sampleData.materials) {
      await db.collection('materials').doc(material.materialId).set(material);
      console.log(`✅ Material added: ${material.name}`);
    }

    // Add machines
    for (const machine of sampleData.machines) {
      await db.collection('machines').doc(machine.machineId).set(machine);
      console.log(`✅ Machine added: ${machine.name}`);
    }

    console.log('\n🎉 Firebase database initialized successfully!');
    console.log('\nDemo Credentials:');
    console.log('  Employee: emp@test.com / password');
    console.log('  Manager: mgr@test.com / password');
    console.log('  Admin: admin@test.com / password');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  }
}

initializeDatabase();
