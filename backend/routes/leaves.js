const express = require('express');
const Leave = require('../models/Leave');
const router = express.Router();

router.get('/:employeeId', async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.params.employeeId });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const leave = new Leave({
      leaveId: 'LEAVE' + Date.now().toString().slice(-6),
      ...req.body
    });
    await leave.save();
    res.status(201).json(leave);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(leave);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
