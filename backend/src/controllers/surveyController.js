import db from '../db/database.js';

/**
 * Controller to handle survey submissions.
 * This function inserts a new survey response into the database.
 */
export const submitSurvey = (req, res) => {
  const {
    full_name, email, date_of_birth, contact_number,
    fav_food_pizza, fav_food_pasta, fav_food_pap_wors, fav_food_other,
    movies_rating, radio_rating, eat_out_rating, tv_rating
  } = req.body;

  // Convert boolean to 0 or 1 for SQLite
  const favPizzaInt = fav_food_pizza ? 1 : 0;
  const favPastaInt = fav_food_pasta ? 1 : 0;
  const favPapWorsInt = fav_food_pap_wors ? 1 : 0;
  const favOtherInt = fav_food_other ? 1 : 0;

  /**
   * Prepare a SQL INSERT statement using placeholders (?) to prevent SQL injection.
   * This statement will insert a new row into the surveys table with all required fields.
   */
  const stmt = db.prepare(`
    INSERT INTO surveys (
      full_name, email, date_of_birth, contact_number,
      fav_food_pizza, fav_food_pasta, fav_food_pap_wors, fav_food_other,
      movies_rating, radio_rating, eat_out_rating, tv_rating
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  try {
    stmt.run(
      full_name, email, date_of_birth, contact_number,
      favPizzaInt, favPastaInt, favPapWorsInt, favOtherInt,
      movies_rating, radio_rating, eat_out_rating, tv_rating
    );
    res.status(201).json({ message: 'Survey saved successfully!' });
  } catch (err) {
    console.error('Error submitting survey:', err);
    res.status(500).json({ error: 'Failed to save survey. ' + err.message });
  }
};

// This function handles a GET request to fetch survey statistics.
// It retrieves all survey responses from the database and returns them as JSON.
export const getSurveyResults = (req, res) => {
  try {
    // Fetch all survey entries from the database.
    const rows = db.prepare('SELECT * FROM surveys').all();
    // Handle the case where no surveys have been submitted yet.
    if (rows.length === 0) {
      return res.json({ message: 'No Surveys completed yet.' });
    }
  } catch (err) {
    console.error('Error fetching survey results:', err);
    res.status(500).json({ error: 'Failed to retrieve survey results. ' + err.message });
  }
};
