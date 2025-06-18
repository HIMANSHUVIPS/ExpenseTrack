import app from "./index.js";
import dotenv from 'dotenv';
dotenv.config();
import ConnectDB from "./DB/Connection.js";

ConnectDB();

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on the port ${process.env.PORT}`);
});
