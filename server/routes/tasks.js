const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (db) => {
    // Get all tasks for the authenticated user
    router.get('/', auth, async (req, res) => {
        try {
            const tasks = await db('tasks').where({ userId: req.user.id });
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Get a task by ID with weather data
    router.get('/:id', auth, async (req, res) => {
        try {
            const task = await db('tasks').where({ id: req.params.id, userId: req.user.id }).first();
            if (!task) return res.status(404).json({ message: 'Task not found' });

            // Fetch weather for Skopje (mock location)
            const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Skopje&appid=${process.env.WEATHER_API_KEY}&units=metric`);
            res.json({ task, weather: weatherResponse.data });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Create a new task
    router.post('/', auth, async (req, res) => {
        try {
            const { title, description, dueDate } = req.body;
            const [id] = await db('tasks').insert({
                title,
                description,
                dueDate,
                userId: req.user.id
            });
            const task = await db('tasks').where({ id }).first();
            res.status(201).json(task);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // Update a task
    router.put('/:id', auth, async (req, res) => {
        try {
            const { title, description, dueDate } = req.body;
            const updated = await db('tasks')
                .where({ id: req.params.id, userId: req.user.id })
                .update({ title, description, dueDate });
            if (!updated) return res.status(404).json({ message: 'Task not found' });
            const task = await db('tasks').where({ id: req.params.id }).first();
            res.json(task);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // Delete a task
    router.delete('/:id', auth, async (req, res) => {
        try {
            const deleted = await db('tasks')
                .where({ id: req.params.id, userId: req.user.id })
                .del();
            if (!deleted) return res.status(404).json({ message: 'Task not found' });
            res.json({ message: 'Task deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    return router;
};