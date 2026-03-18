const express = require('express');
const Production = require('../models/Production');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const productions = await Production.find();
    res.json(productions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const production = new Production({
      productionId: 'PROD' + Date.now().toString().slice(-6),
      ...req.body
    });
    await production.save();
    res.status(201).json(production);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/employee/:employeeId', async (req, res) => {
  try {
    const productions = await Production.find({ employeeId: req.params.employeeId });
    res.json(productions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const production = await Production.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(production);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/daily-summary', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const productions = await Production.find({ createdAt: { $gte: today } });
    const summary = {
      totalProduced: productions.reduce((sum, p) => sum + p.actualQuantity, 0),
      totalTarget: productions.reduce((sum, p) => sum + p.targetQuantity, 0),
      totalRejected: productions.reduce((sum, p) => sum + p.rejectedQuantity, 0),
      totalOrders: productions.length
    };
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
