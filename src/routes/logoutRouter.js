import express from 'express';
import { LogoutController } from '../controllers/logoutController.js';

const logoutController = new LogoutController()

export const logoutRouter = express.Router()

logoutRouter.get('/logout', (req, res) => {
    logoutController.logoutUser(req, res)
})