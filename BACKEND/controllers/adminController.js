import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'



const addDoctor = async (req, res) => {

    try {
        const { name, email, password, speciality, degree, experiance, about, fees, address } = req.body
        const imageFile = req.file
        // checking all doctor data
        if (!name || !email || !password || !speciality || !degree || !experiance || !about || !fees || !address) {
            return res.json({ success: false, message: "missing details" })
        }

        // email validation check
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter valid email" })
        }

        // password validation check
        if (password.length < 8) {
            return res.json({ success: false, message: "enter strong password! atleast 8 letter" })
        }

        // hashing password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hash,
            speciality,
            degree,
            experiance,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success: true, message: "doctor added succesfully" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

// API for admin Login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { email, role: 'admin' }, // payload object
                process.env.JWT_SECRET
            );
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// API FOR APPOINTMENTSS LIST ADMIN
const adminAllAppointmentList = async (req, res) => {
    try {
        const appointmentList = await appointmentModel.find({})
        res.json({ success: true, appointmentList })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


//API TO CANCEL APPOINTMENT
const appointmentCancelByAdmin = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // REMOVING DOCTOR SLOT
        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)
        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment cancelled' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


//API FOR DASHBOARD
const adminDashboard = async (req, res) => {
    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export { addDoctor, loginAdmin, allDoctors, adminAllAppointmentList, appointmentCancelByAdmin, adminDashboard }