import express from 'express'

import { cancelAppointment, doctorAllAppointments, doctorDashboard, doctorList, doctorProfile, loginDoctor, markAppointment, updateProfile } from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'

const Router = express.Router()


Router.get('/list', doctorList)
Router.post('/login', loginDoctor)
Router.get('/doctor-appointments', authDoctor, doctorAllAppointments)
Router.post('/complete-appointment', authDoctor, markAppointment)
Router.post('/cancel-appointment', authDoctor, cancelAppointment)
Router.get('/dashboard', authDoctor, doctorDashboard)
Router.get('/profile', authDoctor, doctorProfile)
Router.post('/update-profile', authDoctor, updateProfile)


export default Router