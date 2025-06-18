import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();
import AuthRoutes from './router/auth.routes.js';

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("This is the sample route");
});

app.use('/auth/expense',AuthRoutes);

export default app;
