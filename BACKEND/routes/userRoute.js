import express from 'express'

import { getProfile, loginUser, registerUser, updateProfile, bookAppointment, listAppointment, cancelAppointment } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const Router = express.Router()

Router.post('/register', registerUser)
Router.post('/login', loginUser)

Router.get('/get-profile', authUser, getProfile)
Router.post('/update-profile', upload.single('image'), authUser, updateProfile)
Router.post('/book-appointment', authUser, bookAppointment)
Router.get('/appointments', authUser, listAppointment)
Router.post('/cancel-appointment', authUser, cancelAppointment)
// Router.post('/payment-razorpay', authUser, paymentRazorpay)


export default Router