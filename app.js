import express from 'express'
import cors from 'cors'
import contactRoute from './routes/contact.route.js'
import dotenv from 'dotenv';
dotenv.config();
const app = express()

//middlewares



app.use(
  cors()
);

app.use(express.json())


//routes

app.use('/api/contact',contactRoute)

//health-check
app.get('/api/health-check',(req,res)=> {
    res.status(200).json({status:'ok'})
})


export default app