import express from 'express';
import cors from 'cors';
import db from './db/database.js';

const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello from the Lifestyle Survey App Server!');
});

try {
  db.prepare(`SELECT 1`).get();
  console.log('Connected to the database');
} catch (error) {
  console.error('Database connection failed:', error);
  process.exit(1);
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});