import express from 'express';
import { homeRouter } from './homeRouter.js';
import { registerRouter } from './registerRouter.js';
import { loginRouter } from './authenticationRouter.js';

export const router = express.Router();


router.use('/', homeRouter);
router.use('/', registerRouter);
router.use('/', loginRouter);