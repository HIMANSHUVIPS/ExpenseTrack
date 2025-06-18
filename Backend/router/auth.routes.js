import express from 'express';
import { Login, Logout, Signup } from '../controllers/Auth.Controller.js';
import { LoginSchema, RegisterSchema } from '../validation/user.validation.js';
import { Validate } from '../middleware/validate.middleware.js';
import { AutheticatedUser } from '../middleware/AuthenticatedUser.middleware.js';
const router = express.Router();

router.post('/signup',Validate(RegisterSchema),AutheticatedUser,Signup);
router.post('/login',Validate(LoginSchema),AutheticatedUser,Login);
router.post('/logout',Logout);

export default router;