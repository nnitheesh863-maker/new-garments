const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, department, designation } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const employeeId = 'EMP' + Date.now().toString().slice(-6);

    const user = new User({
      employeeId,
      name,
      email,
      password: hashedPassword,
      role,
      department,
      designation
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', employeeId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });

    res.json({ token, user: { id: user._id, name: user.name, role: user.role, employeeId: user.employeeId } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
