import express from 'express';
import { AutheticatedUser } from '../middleware/AuthenticatedUser.middleware.js';
const router = express.Router();
import { USER_DATA, USER_EXPENSES, USER_INCOMES } from '../controllers/data.controller.js';

router.get('/user-profile-data',AutheticatedUser,USER_DATA);
router.get('/user-expenses',AutheticatedUser,USER_EXPENSES);
router.get('/user-incomes',AutheticatedUser,USER_INCOMES);

export default router;