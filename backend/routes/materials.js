const express = require('express');
const Material = require('../models/Material');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const material = new Material({
      materialId: 'MAT' + Date.now().toString().slice(-6),
      ...req.body
    });
    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(material);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/low-stock', async (req, res) => {
  try {
    const lowStock = await Material.find({ status: 'low-stock' });
    res.json(lowStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
