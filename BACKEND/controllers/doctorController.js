import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js";



const changeAvailablity = async (req, res) => {
    try {

        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'changed Availablity' })

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// API FOR DOCTOR LOGIN
const loginDoctor = async (req, res) => {
    try {

        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)
        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            return res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


//API TO FETCH DOCTOR ALL APPOINTMENT
const doctorAllAppointments = async (req, res) => {

    try {

        const docId = req.docId
        const appointments = await appointmentModel.find({ docId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}


// API TO MARK APPOINTMENT
const markAppointment = async (req, res) => {

    try {

        // const { docId, appointmentId } = req.body

        const { appointmentId } = req.body;
        const docId = req.docId;

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true }, { new: true })
            return res.json({ success: true, message: 'Appointment done' })
        } else {
            return res.json({ success: false, message: 'mark failed' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}


// API TO CANCEL APPOINTMENT
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const docId = req.docId;

        // const { docId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment cancelled' })
        } else {
            return res.json({ success: false, message: 'cancellation failed' })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// API TO SET DOCTOR DASHBOARD
const doctorDashboard = async (req, res) => {
    try {
        let docId = req.docId
        let appointments = await appointmentModel.find({ docId })

        let earnings = 0;
        let patients = [];
        appointments.forEach((appt) => {

            if (appt.isCompleted || appt.payment) {
                earnings += appt.amount || 0;
            }
            console.log("earnings:" + earnings);



            if (!patients.includes(appt.userData.userId)) {
                patients.push(appt.userData.userId) || 0
            }

            // if (!patients.some(p => p._id.toString() === appt.userId.toString())) {
            //     patients.push(appt.userData);
            // }
            console.log("patients:" + patients.length);
        })


        const dashData = {
            "earnings": earnings,
            "patients": patients.length,
            "appointments": appointments.length,
            "latestAppointment": appointments.slice().reverse().slice(0, 5)
        }
        res.json({ success: true, dashData })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }

}



const doctorProfile = async (req, res) => {
    try {
        // const { appointmentId } = req.body;
        const docId = req.docId;

        // const { docId, appointmentId } = req.body
        const profileData = await doctorModel.findById(docId).select("-password")
        return res.json({ success: true, profileData })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


const updateProfile = async (req, res) => {
    try {
        const docId = req.docId;
        const { fees, address, available } = req.body;

        const updateData = await doctorModel.findByIdAndUpdate(docId, { fees, address, available }, { new: true })
        return res.json({ success: true, updateData })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}




export { changeAvailablity, doctorList, loginDoctor, doctorAllAppointments, markAppointment, cancelAppointment, doctorDashboard, doctorProfile, updateProfile }