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
    const totalSurveys = rows.length;

    // Calculate the age of each respondent based on their date of birth.
    const ages = rows.map(row => {
      const dob = new Date(row.date_of_birth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return age;
    }).filter(age => !isNaN(age)); // Ensure only valid age numbers are processed.

    // Calculate age-related statistics: average, oldest, and youngest.
    // '.toFixed(1)' formats numbers to one decimal place. 'N/A' is used if no valid ages.
    const avgAge = ages.length > 0 ? (ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1) : 'N/A';
    const oldest = ages.length > 0 ? Math.max(...ages) : 'N/A';
    const youngest = ages.length > 0 ? Math.min(...ages) : 'N/A';

    // Calculate the number of people who prefer each type of food.
    // Assumes boolean-like values (1 for liked) in the respective DB columns.
    const pizzaFans = rows.filter(r => r.fav_food_pizza === 1).length;
    const pastaFans = rows.filter(r => r.fav_food_pasta === 1).length;
    const papAndWorsFans = rows.filter(r => r.fav_food_pap_wors === 1).length;

    // Calculate the percentage of people for each food preference.
    const pizzaPercent = totalSurveys > 0 ? ((pizzaFans / totalSurveys) * 100).toFixed(1) : '0.0';
    const pastaPercent = totalSurveys > 0 ? ((pastaFans / totalSurveys) * 100).toFixed(1) : '0.0';
    const papAndWorsPercent = totalSurveys > 0 ? ((papAndWorsFans / totalSurveys) * 100).toFixed(1) : '0.0';

    // Calculate average ratings for different activities.
    // '.reduce' sums up the ratings, which is then divided by the total number of surveys.
    const avgMoviesRating = totalSurveys > 0 ? (
      rows.reduce((sum, r) => sum + r.movies_rating, 0) / totalSurveys
    ).toFixed(1) : 'N/A';
    const avgRadioRating = totalSurveys > 0 ? (
      rows.reduce((sum, r) => sum + r.radio_rating, 0) / totalSurveys
    ).toFixed(1) : 'N/A';
    const avgEatOutRating = totalSurveys > 0 ? (
      rows.reduce((sum, r) => sum + r.eat_out_rating, 0) / totalSurveys
    ).toFixed(1) : 'N/A';
    const avgTvRating = totalSurveys > 0 ? (
      rows.reduce((sum, r) => sum + r.tv_rating, 0) / totalSurveys
    ).toFixed(1) : 'N/A';

    // Construct and send the JSON response with all calculated stats.
    res.json({
      'totalSurveys number of surveys': totalSurveys,
      'Average Age': avgAge,
      'Oldest person who participated in survey': oldest,
      'Youngest person who participated in survey': youngest,
      'Percentage of people who like Pizza': pizzaPercent,
      'Percentage of people who like Pasta': pastaPercent,
      'Percentage of people who like Pap and Wors': papAndWorsPercent,
      'People who like to watch movies': avgMoviesRating,
      'People like to listen to radio': avgRadioRating,
      'People like to eat out': avgEatOutRating,
      'People like to watch TV': avgTvRating
    });

  } catch (err) {
    console.error('Error fetching survey results:', err);
    res.status(500).json({ error: 'Failed to retrieve survey results. ' + err.message });
  }
};
