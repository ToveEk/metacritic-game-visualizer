import express from 'express';
import { homeRouter } from './homeRouter.js';

export const router = express.Router();


router.use('/', homeRouter);