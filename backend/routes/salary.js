const express = require('express');
const Salary = require('../models/Salary');
const router = express.Router();

router.get('/:employeeId', async (req, res) => {
  try {
    const salaries = await Salary.find({ employeeId: req.params.employeeId });
    res.json(salaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const salary = new Salary({
      salaryId: 'SAL' + Date.now().toString().slice(-6),
      ...req.body
    });
    await salary.save();
    res.status(201).json(salary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const salary = await Salary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(salary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
