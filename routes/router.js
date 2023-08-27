import express from 'express';
import { beginner, elephantSql2, sendMail } from '../controller/controller.js';

const router = express.Router();

router.get('/', beginner);
router.get('/elephantSql', elephantSql2);
router.get('/sendMail', sendMail)

export default router;