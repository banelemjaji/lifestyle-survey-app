import express from 'express';
import { submitSurvey, getSurveyResults } from '../controllers/surveyController.js';

const router = express.Router();

router.post('/survey', submitSurvey);
router.get('/results', getSurveyResults);

export default router;
