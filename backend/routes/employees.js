const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const employees = await User.find().select('-password');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const employee = await User.findById(req.params.id).select('-password');
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const employee = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
