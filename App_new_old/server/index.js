const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret'; // JWT Secret for token generation

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'student_platform',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 🔹 Test DB connection
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'Database connection successful' });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// 🔹 Register new user (Email/Password)
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if email exists
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Generate a unique ID for non-Firebase users
    const localId = 'local_' + Date.now() + Math.floor(Math.random() * 1000);

    // Insert new user
    await pool.query(
      'INSERT INTO users (firebase_uid, name, email, password, created_at, last_login) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [localId, name, email, hashedPassword]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: localId, name, email },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 🔹 User Login (JWT Token-based)
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Fetch user details
    const [users] = await pool.query(
      'SELECT firebase_uid, name, email, password, photo_url FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = users[0];

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.firebase_uid, email: user.email }, SECRET_KEY, {
      expiresIn: '7d',
    });

    // Update last login time
    await pool.query('UPDATE users SET last_login = NOW() WHERE email = ?', [email]);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.firebase_uid, name: user.name, email: user.email, photoURL: user.photo_url },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 🔹 Get user profile (Protected Route)
app.get('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const [users] = await pool.query(
      'SELECT firebase_uid, name, email, photo_url, created_at, last_login FROM users WHERE firebase_uid = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(users[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 🔹 Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// 🔹 Example protected route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected data', user: req.user });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});