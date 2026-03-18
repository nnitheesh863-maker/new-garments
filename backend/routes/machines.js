const express = require('express');
const Machine = require('../models/Machine');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const machines = await Machine.find();
    res.json(machines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const machine = new Machine({
      machineId: 'MACH' + Date.now().toString().slice(-6),
      ...req.body
    });
    await machine.save();
    res.status(201).json(machine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const machine = await Machine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(machine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/report-issue', async (req, res) => {
  try {
    const { issueType, description, urgency } = req.body;
    const machine = await Machine.findById(req.params.id);
    machine.status = urgency === 'critical' ? 'broken' : 'under-maintenance';
    await machine.save();
    res.json({ message: 'Issue reported successfully', machine });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
