const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Get all reports
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('reports').orderBy('createdAt', 'desc').get();
    const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get reports by status
router.get('/status/:status', async (req, res) => {
  try {
    const snapshot = await db.collection('reports')
      .where('status', '==', req.params.status)
      .orderBy('createdAt', 'desc')
      .get();
    const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a report
router.post('/', async (req, res) => {
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

// Update report status (manager action)
router.put('/:id', async (req, res) => {
  try {
    const reportRef = db.collection('reports').doc(req.params.id);
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };

    await reportRef.update(updateData);
    const doc = await reportRef.get();
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get analytics data
router.get('/analytics/summary', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get today's production
    const productionSnapshot = await db.collection('production')
      .where('createdAt', '>=', today)
      .get();
    const todayProduction = productionSnapshot.docs.map(doc => doc.data());

    // Get pending reports
    const pendingReports = await db.collection('reports')
      .where('status', '==', 'pending')
      .get();

    // Get employee count
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

// Get production analytics for charts
router.get('/analytics/production', async (req, res) => {
  try {
    const snapshot = await db.collection('production')
      .orderBy('createdAt', 'desc')
      .limit(30)
      .get();

    const production = snapshot.docs.map(doc => doc.data());
    
    // Group by date
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

module.exports = router;
