import express from 'express';
import { RegisterController } from '../controllers/registerController.js'

const registerController = new RegisterController()

export const registerRouter = express.Router()

registerRouter.get('/register', (req, res) => {
    registerController.renderRegisterPage(req, res)
})