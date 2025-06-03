# Lifestyle Survey Application

A full-stack web application designed to gather and analyze survey data on people's lifestyle preferences. Users can fill out a survey, and the application will store the data and display aggregated results.

## Features

* **Fill Out Survey:**
    * Enter personal details (name, email, date of birth, contact number).
    * Select favorite foods using checkboxes.
    * Rate agreement with lifestyle statements on a 1-5 scale using radio buttons.
    * Client-side validation for required fields, age (5-120 years), and rating selections.
* **View Survey Results:**
    * Displays aggregated data from all submitted surveys.
    * Shows "No Surveys Available" if no data is present.
    * Calculated statistics include:
        * Total number of surveys.
        * Average age of participants.
        * Oldest and youngest participants.
        * Percentage of people who like Pizza, Pasta, and Pap and Wors (rounded to 1 decimal place).
        * Average ratings for liking to watch movies, listen to radio, eat out, and watch TV (rounded to 1 decimal place).

## Technologies Used

* **Backend:**
    * Node.js
    * Express.js
    * better-sqlite3 (for SQLite database interaction)
* **Frontend:**
    * React
    * Axios 
    * React Router
    * Tailwind CSS
* **Database:**
    * SQLite

## Prerequisites

* Node.js (v18 or later recommended)
* npm (Node Package Manager, comes with Node.js)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/banelemjaji/lifestyle-survey-app.git
    cd lifestyle-survey-app
    ```

2.  **Backend Setup:**
    * Navigate to the backend directory:
        ```bash
        cd backend
        ```
    * Install dependencies:
        ```bash
        npm install
        ```

3.  **Frontend Setup:**
    * Navigate to the frontend directory :
        ```bash
        cd ../frontend
        ```
    * Install dependencies:
        ```bash
        npm install
        ```

## Running the Application

1.  **Start the Backend Server:**
    * From the `backend` directory:
        ```bash
        npm start
        # Or if you have a different script in server/package.json, e.g., npm run dev
        ```
    * The server will typically start on `http://localhost:5000`.

2.  **Start the Frontend Development Server:**
    * From the `frontend` directory:
        ```bash
        npm start
        ```
    * This will usually open the application in your default web browser, typically at `http://localhost:5173`.

Once both are running, you can access the application through the frontend URL (e.g., `http://localhost:5173`).

## API Endpoints

The backend exposes the following main API endpoints (prefixed with `/api`):

* `POST /api/survey`: Submits new survey data.
* `GET /api/results`: Retrieves aggregated survey results.

---