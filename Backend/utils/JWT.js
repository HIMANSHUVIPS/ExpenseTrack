import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_TOKEN = (USER) => {
    return jwt.sign(
      {
        id: USER._id,
        email:USER.email
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN}
    );
};

export default JWT_TOKEN;