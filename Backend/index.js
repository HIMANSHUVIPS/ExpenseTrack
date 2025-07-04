import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
import AuthRoutes from './router/auth.routes.js';
import FormRoutes from './router/form.routes.js';
import DataRoutes from './router/data.routes.js';
import GoogleRoutes from "./router/Google.routes.js"
import './config/Passport.config.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(passport.initialize());

const allowedOrigins = [
  "http://localhost:5173",
  "https://expenzo-frontend-six.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.get('/',(req,res)=>{
    res.send("This is the sample route");
});

app.use('/auth/expense',AuthRoutes);
app.use('/auth/smarteats',GoogleRoutes);
app.use('/form/expenzo',FormRoutes);
app.use('/data',DataRoutes);
export default app;
