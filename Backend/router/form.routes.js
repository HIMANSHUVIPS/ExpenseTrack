import express from 'express';
import { AutheticatedUser } from '../middleware/AuthenticatedUser.middleware.js';
import { ADD_EXPENSE, ADD_INCOME } from '../controllers/form.controller.js';
const router = express.Router();

router.post('/add-expense',AutheticatedUser,ADD_EXPENSE);
router.post('/add-income',AutheticatedUser,ADD_INCOME);



export default router