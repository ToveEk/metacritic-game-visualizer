import express from 'express'
import { HomeController } from '../controllers/homeController.js'

const homeController = new HomeController()

export const homeRouter = express.Router()

homeRouter.get('/', (req, res) => {

    homeController.renderHomePage(req, res)
})