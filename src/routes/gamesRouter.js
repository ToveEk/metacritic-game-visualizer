import express from 'express';
import { GamesController } from '../controllers/gamesController.js';

const gamesController = new GamesController()

export const gamesRouter = express.Router()

gamesRouter.get('/games', (req, res) => {
    gamesController.renderGamesPage(req, res)
})