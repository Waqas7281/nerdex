import express from 'express';
import helmet, { contentSecurityPolicy } from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import {aj} from './lib/arcjet.js'
dotenv.config();

import prodectRoutes from "./routes/productRoutes.js"
import {sql} from "./config/db.js"; // Import the sql variable from the db module


const app = express();
const PORT = process.env.PORT  || 3000;

const __dirname =path.resolve();

console.log(PORT);
app.use(helmet(
    {
        contentSecurityPolicy:false
    }
));
app.use(morgan("dev"));

app.use(express.json());//convert comming data to json
app.use(cors());

//apply arcjet 
app.use(async(req,res,next)=>{
    try {
        const decision=await aj.protect(
            req,{
                requested:1 // specifies that each request consumes one token
            }
        )
        if(decision.isDenied())
        {
            if(decision.isRateLimited())
            {
                return res.status(429).json({
                    message:"Rate limit exceeded"
                })
            }
            else if(decision.isBot())
            {
                return res.status(403).json({
                    message:"Bot detected"
                })
            }
            else
            {
                return res.status(403).json({
                    message:"Forbidden"
                })
            }
        }
        //check spoofed bots
        next();
        if(decision.results.some((result)=>result.reason.isBot() && result.reason.isSpoofed()))
        {
            res.status(403).json({
                error:"Spoofed Bot detected"
            })
        }
    } catch (error) {
        console.log("ARCJET ERROR",error);
        next(error);
    }
})

app.use('/api/products',prodectRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/pern-stack/dist')));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend/pern-stack","dist","index.html"));
    })
}

async function initDB() {
    try {
        // await sql`SELECT 1`;
        await sql`
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
        await sql`
         CREATE TABLE IF NOT EXISTS userdata (
            id SERIAL PRIMARY KEY,
            courseName VARCHAR(255) NOT NULL,
            coursePrice DECIMAL(10, 2) NOT NULL,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            idNumber  VARCHAR(255) NOT NULL,
            phoneNumber VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
        
    } catch (e) {
        console.error('Database connection failed', e);
    }
}
console.log('before initDB seccess');
initDB().then(() => {
    app.listen(3000,() => {
        console.log(`Server is running on port ${PORT}`);
    });
})


