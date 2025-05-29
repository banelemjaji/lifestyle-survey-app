import express from 'express';
import cors from 'cors';
import db from './db/database.js';
import surveyRoutes from './routes/surveyRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(cors()); 
app.use(express.json()); 

app.use('/api', surveyRoutes);

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