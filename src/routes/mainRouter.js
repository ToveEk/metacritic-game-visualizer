import express from 'express';
import { homeRouter } from './homeRouter.js';
import { authenticationRouter } from './authenticationRouter.js';

export const router = express.Router();


router.use('/', homeRouter);
router.use('/', authenticationRouter);