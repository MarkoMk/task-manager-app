const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (db) => {
    // Register a new user
    router.post('/register', async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const existingUser = await db('users').where({ email }).first();
            if (existingUser) return res.status(400).json({ message: 'User already exists' });

            const hashedPassword = await bcrypt.hash(password, 10);
            const [id] = await db('users').insert({
                username,
                email,
                password: hashedPassword
            });

            const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(201).json({ token });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // Login a user
    router.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await db('users').where({ email }).first();
            if (!user) return res.status(400).json({ message: 'Invalid credentials' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    return router;
};