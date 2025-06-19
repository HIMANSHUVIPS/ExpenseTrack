import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
import AuthRoutes from './router/auth.routes.js';
import FormRoutes from './router/form.routes.js';

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get('/',(req,res)=>{
    res.send("This is the sample route");
});

app.use('/auth/expense',AuthRoutes);
app.use('/form/expenzo',FormRoutes);
export default app;
