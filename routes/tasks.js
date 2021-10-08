const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Example of how to get tasks in frontend
/* 
fetch('http://localhost:5000/tasks')
  .then(res => {
   return res.json();
  })
  .then(data => console.log(data));
*/

router.post('/', async (req, res) => {
    const task = new Task(
        {
            name: req.body.name,
            status: req.body.status
        }
    );

    try {
        const savedTask = await task.save();
        res.json(savedTask);
    }
    catch(e) {
        res.json({message: e});
    }
});

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    }
    catch(e) {
        res.json(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.json(task);
    }
    catch(e) {
        res.json(e);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.deleteOne({ _id: req.params.id });
        res.json(deletedTask);
    }
    catch(e) {
        res.json(e);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.updateOne({ _id: req.params.id }, { $set: { name: req.body.name, status: req.body.status } })
        res.json(updatedTask);
    }
    catch(e) {
        res.json(e);
    }
})

module.exports = router;