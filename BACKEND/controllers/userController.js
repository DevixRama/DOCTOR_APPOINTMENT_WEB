import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import appointmentModel from '../models/appointmentModel.js'
import doctorModel from '../models/doctorModel.js'
import razorpay from 'razorpay'

//API TO REGISTER USER

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !password || !email) {
            return res.json({ success: false, message: 'missing Details' })
        }
        console.log("working");
        
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'enter valid email' })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: 'enter strong password' })
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hash
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


//API TO GET USERS PROFILE DATA
const getProfile = async (req, res) => {
    try {

        const userId = req.userId;
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



// API TO UPDATE USER PROFILE DATA
const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file

        if (!name, !phone, !address, !dob, !gender) {
            return res.json({ success: false, message: 'data Missing' })
        }

        await userModel.findByIdAndUpdate(
            userId, { name, phone, address: JSON.parse(address), dob, gender }
        );

        if (imageFile) {
            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: "profile Updated" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({ success: false, message: 'slot not available' })
        }

        let slots_booked = docData.slots_booked

        //checking for slot available
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'slot not available' })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount: docData.fees,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        //save new slot data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment booked' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


const listAppointment = async (req, res) => {
    try {
        const userId = req.userId; // ✅ get from middleware
        const appointments = await appointmentModel.find({ userId });

        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


//API TO CANCEL APPOINTMENT
const cancelAppointment = async (req, res) => {
    try {
        const userId = req.userId; // ✅ get from middleware
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        //verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

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



// const razorpayInstance = new razorpay({
//     key_id: process.env.RAZORPAY_KEY_SECRET,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// })

// //API TO MAKE PAYMENT OF APPOINTMENT USING RAZORPAY
// const paymentRazorpay = async (req, res) => {

//     try {

//         const { appointmentId } = req.body
//         const appointmentData = await appointmentModel.findById(appointmentId)

//         if (!appointmentData || appointmentData.cancelled) {
//             return res.json({ success: false, message: 'Appointment cancelled or not found' })
//         }

//         // option for payment
//         const options = {
//             amount: appointmentData.amount * 100,
//             currency: process.env.CURRANCY,
//             receipt: appointmentId,
//         }
//         // order Details
//         const order = await razorpayInstance.orders.create(options)
//         res.json({ success: true, order })

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }


// }



export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment }