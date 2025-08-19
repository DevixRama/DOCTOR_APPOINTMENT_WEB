import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const DoctorContextProvider = (props) => {
    const [docToken, setDocToken] = useState(localStorage.getItem('docToken') || '');
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)


    const getAllAppointments = async () => {

        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/doctor-appointments', { headers: { docToken } })
            if (data.success) {
                setAppointments(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const completeAppointment = async (appointmentId) => {

        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { docToken } })
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    const cancelAppointment = async (appointmentId) => {

        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { docToken } })
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    const getDashData = async () => {

        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { docToken } })
            if (data.success) {
                toast.success(data.message)
                setDashData(data.dashData)
                console.log(data.dashData);

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    const getDoctorProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { docToken } })
            if (data.success) {
                setProfileData(data.profileData)
                console.log(data.profileData);
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }




    const value = {
        docToken, setDocToken,
        backendUrl,
        appointments, setAppointments,
        getAllAppointments,
        completeAppointment, cancelAppointment,
        dashData, setDashData,
        getDashData,
        profileData, setProfileData,
        getDoctorProfileData
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
