const express = require('express');
const router = express.Router();
const View = require('../models/View');

// Example of how to get Views in frontend
/* 
fetch('http://localhost:5000/views')
  .then(res => {
   return res.json();
  })
  .then(data => console.log(data));
*/

router.post('/', async (req, res) => {
  const view = new View({
    name: req.body.name,
    status: req.body.status,
  });

  try {
    const savedView = await view.save();
    res.json(savedView);
  } catch (e) {
    res.json({ message: e });
  }
});

router.get('/', async (req, res) => {
  try {
    const views = await View.find();
    res.json(views);
  } catch (e) {
    res.json(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const view = await View.findById(req.params.id);
    res.json(view);
  } catch (e) {
    res.json(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedView = await View.deleteOne({ _id: req.params.id });
    res.json(deletedView);
  } catch (e) {
    res.json(e);
  }
});

router.delete('/', async (req, res) => {
  try {
    const deletedViews = await View.deleteMany();
    res.json(deletedViews);
  } catch (e) {
    res.json(e);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedView = await View.updateOne(
      { _id: req.params.id },
      { $set: { name: req.body.name, status: req.body.status } },
    );
    res.json(updatedView);
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
