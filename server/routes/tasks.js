const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const axios = require('axios');

// Get all tasks for authenticated user
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get task by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        // Fetch weather for task location (mock for Skopje)
        const weather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Skopje&appid=${process.env.WEATHER_API_KEY}&units=metric`);
        res.json({ task, weather: weather.data });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a task
router.post('/', auth, async (req, res) => {
    try {
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            user: req.user.id
        });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true }
        );
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

