import dotenv from 'dotenv'
import express from 'express'
import bodyParser from "body-parser"
import userRouter from './routes/userRoute.js'
import "express-async-errors";
import errorHandlerMiddle  from './middleware/error-handler.js';
import notFound from './middleware/notFond.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())

import connectDB from './database/db.js'
app.use(bodyParser.json());
app.use(cookieParser());

// route
app.use('/api/v1',userRouter)
// error middleware 
  app.use(errorHandlerMiddle)
   app.use(notFound);
const PORT = process.env.PORT || 5000

const start = async()=>{
    try {
        //connect db
        await connectDB(process.env.MONGO_URL)
       app.listen(PORT, () => {
         console.log(`Listening on Port  ${PORT}`);
       });
    } catch (error) {
        console.log(error)
    }
}

start();






