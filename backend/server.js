import express from "express";
import dotenv from 'dotenv';
import path from 'path';
import { connectdb } from "./config/db.js";
import userdetailsRoutes from './routes/userdetails.route.js';


dotenv.config();
const PORT = process.env.PORT ||5000

const app = express()
const  __dirname = path.resolve();
app.use(express.json())
app.use("/api",userdetailsRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/frontend/build")));

    app.get("*",(req,res)=> {
        res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
    })
}


app.listen(PORT,()=>{
    connectdb()
})
