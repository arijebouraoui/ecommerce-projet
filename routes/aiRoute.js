import express from 'express';
import { chatWithAI, getRecommendations } from '../controllers/aiController.js';

const router = express.Router();

// Chat endpoint
router.post('/chat', chatWithAI);

// Product recommendations endpoint
router.post('/recommend', getRecommendations);

export default router;