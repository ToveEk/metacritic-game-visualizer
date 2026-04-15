import dotenv from 'dotenv';

dotenv.config();

/**
 * Configuration options for session management using express-session.
 */
export const sessionOptions = {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'strict'
    }
}
