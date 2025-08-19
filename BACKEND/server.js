// <---- Load environment variables first ---->
import dotenv from 'dotenv';
dotenv.config();

// <---- External dependencies ---->
import express from 'express';
import cors from 'cors';

// <---- Internal config files ---->
import connectDB from './config/mongodb.js';
import connectClodinary from './config/cloudinary.js';

// <---- Routers ---->
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js'


// <------app config------->
const app = express()
const port = process.env.PORT || 3000
connectDB()
connectClodinary()


// <---------middleware----------->
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// <----------api endpoint------------>
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
// localhost:3000/api/admin/add-doctor


// <-----------api---------->
app.get('/', (req, res) => {
  res.send('Hello great World!')
})



app.listen(port, () => {
  console.log(`server started ${port}`)
})
