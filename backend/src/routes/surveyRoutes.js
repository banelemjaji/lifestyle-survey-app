import express from 'express';
import { submitSurvey } from '../controllers/surveyController.js';

const router = express.Router();

router.post('/survey', submitSurvey);

export default router;
