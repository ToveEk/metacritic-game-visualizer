import express from 'express';
import { AuthenticationController } from '../controllers/authenticationController.js';

const auth = new AuthenticationController()

export const authenticationRouter = express.Router()

authenticationRouter.get('/login', (req, res) => {
    auth.renderLoginPage(req, res)
})

authenticationRouter.get('/login', (req, res) => {
    auth.authenticateUser(req, res)
})

authenticationRouter.get('/auth/github/callback', (req, res) => {
    auth.handleOAuthCallback(req, res)
})