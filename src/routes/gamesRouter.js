import express from 'express';
import { GamesController } from '../controllers/gamesController.js';
import { requireAuth } from '../middleware/auth.js';

const gamesController = new GamesController()

export const gamesRouter = express.Router()

gamesRouter.get('/games', requireAuth, (req, res) => {
    gamesController.renderGamesPage(req, res)
})