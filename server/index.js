const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const knex = require('knex');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize SQLite database
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, 'task-manager.db')
    },
    useNullAsDefault: true
});

// Create tables if they don't exist
async function initDB() {
    try {
        // Users table
        await db.schema.createTableIfNotExists('users', table => {
            table.increments('id').primary();
            table.string('username').unique().notNullable();
            table.string('email').unique().notNullable();
            table.string('password').notNullable();
        });

        // Tasks table
        await db.schema.createTableIfNotExists('tasks', table => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('description');
            table.date('dueDate');
            table.integer('userId').unsigned().references('id').inTable('users').notNullable();
        });

        console.log('SQLite database initialized');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}

initDB();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// API Routes
app.use('/api/tasks', taskRoutes(db));
app.use('/api/users', userRoutes(db));

// Serve React app for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});