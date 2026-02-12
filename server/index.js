const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MySQL connection configuration
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'mysql',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '89c64e8a187ef7949d59278de5311b70',
    database: process.env.DB_NAME || 'support_way_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const db = pool.promise();

// Routes
app.get('/api/supports', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM supports ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving supports' });
    }
});

app.post('/api/supports', async (req, res) => {
    const { technician_name, client_name, support_type, scheduled_time, assigned_at } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO supports (technician_name, client_name, support_type, scheduled_time, assigned_at, status) VALUES (?, ?, ?, ?, ?, ?)',
            [technician_name, client_name, support_type, scheduled_time, assigned_at, 'assigned']
        );
        res.status(201).json({ id: result.insertId, ...req.body, status: 'assigned' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating support' });
    }
});

// Update support status/metrics
app.put('/api/supports/:id', async (req, res) => {
    const { id } = req.params;
    const { status, transport_mode, travel_duration_mins, support_duration_mins, total_duration_mins } = req.body;

    // Build update query dynamically or use a simple one for now
    try {
        await db.query(
            'UPDATE supports SET status = ?, transport_mode = ?, travel_duration_mins = ?, support_duration_mins = ?, total_duration_mins = ? WHERE id = ?',
            [status, transport_mode, travel_duration_mins, support_duration_mins, total_duration_mins, id]
        );
        res.json({ message: 'Support updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating support' });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend is running' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
