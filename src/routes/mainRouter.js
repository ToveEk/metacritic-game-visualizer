import express from 'express';
import { homeRouter } from './homeRouter.js';
import { authenticationRouter } from './authenticationRouter.js';
import { gamesRouter } from './gamesRouter.js';
import { logoutRouter } from './logoutRouter.js';

export const router = express.Router();


router.use('/', homeRouter);
router.use('/', authenticationRouter);
router.use('/', gamesRouter);
router.use('/', logoutRouter);