import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import session from 'express-session'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import { router } from './routes/mainRouter.js'
import { setBaseURL } from './middleware/setBaseURL.js'
import { errorHandler } from './middleware/errorHandler.js'
import { sessionOptions } from './config/session.js'

try {
    // Initialize Express app
    const app = express()

    // Set base URL
    const baseURL = process.env.BASE_URL || '/'
    console.log(`Base URL: ${baseURL}`)
    app.use(setBaseURL(baseURL))

    // Middleware to parse URL-encoded bodies and cookies
    const directoryFullName = dirname(fileURLToPath(import.meta.url))
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())

    // Apply ejs layouts, set view engine and static files
    app.use(expressLayouts)
    app.set('view engine', 'ejs')
    app.set('views', path.join(directoryFullName, 'views'))
    app.set('layout', 'default')
    app.set('layout extractScripts', true)
    app.set('layout extractStyles', true)

    // Trust railway proxy
    app.set('trust proxy', 1)

    // Session management
    app.use(session(sessionOptions))

    // Flash messages
    app.use((req, res, next) => {
        if (req.session.flash) {
            res.locals.flash = req.session.flash
            delete req.session.flash
        }
        next()
    })

    // Middleware to make jwt available in all views
    app.use((req, res, next) => {
        res.locals.jwt = req.cookies.jwt || null
        next()
    })

    // Set up routes (before static files so dynamic routes take precedence)
    app.use('/', router)

    // Serve static files
    app.use(express.static(path.join(directoryFullName, '..', 'public')))

    // Error handling middleware
    app.use(errorHandler)

    // Start the server
    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
        console.log('Press Ctrl+C to stop the server')
    })
} catch (error) {
    console.error('Error starting server:', error)
    process.exit(1)
}