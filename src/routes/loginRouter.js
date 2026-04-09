import express from 'express';
import { LoginController } from '../controllers/loginController.js';

const loginController = new LoginController()

export const loginRouter = express.Router()

loginRouter.get('/login', (req, res) => {
    loginController.renderLoginPage(req, res)
})