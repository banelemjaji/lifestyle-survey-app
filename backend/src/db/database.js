import Database from 'better-sqlite3';
import path from 'path';

// Define the path to the SQLite database file.
// This makes sure the database is stored inside the 'src/db' folder.
const dbFile = path.resolve('src/db/survey.db');
const db = new Database(dbFile);

// SQL statement to initialize the 'surveys' table.
const initSQL = `
CREATE TABLE IF NOT EXISTS surveys (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  date_of_birth TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  fav_food_pizza INTEGER DEFAULT 0,
  fav_food_pasta INTEGER DEFAULT 0,
  fav_food_pap_wors INTEGER DEFAULT 0,
  fav_food_other INTEGER DEFAULT 0,
  movies_rating INTEGER NOT NULL,
  radio_rating INTEGER NOT NULL,
  eat_out_rating INTEGER NOT NULL,
  tv_rating INTEGER NOT NULL
);
`;

// Execute the SQL to create the table if it doesn't already exist.
// This runs only once when the server starts.
db.exec(initSQL);

export default db;
