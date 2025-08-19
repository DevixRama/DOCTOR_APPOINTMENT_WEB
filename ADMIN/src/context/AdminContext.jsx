import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '')
    const [doctors, setdoctors] = useState([])
    const [appointmentList, setAppointmentList] = useState([])
    const [dashData, setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { adminToken } })
            if (data.success) {

                setdoctors(data.doctors)

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { adminToken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/appointment-list', { headers: { adminToken } })
            if (data.success) {
                setAppointmentList(data.appointmentList)

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { adminToken } })
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { adminToken } })
            if (data.success) {
                setDashData(data.dashData)

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    const value = {
        adminToken, setAdminToken,
        backendUrl, doctors,
        getAllDoctors, changeAvailability,
        appointmentList, setAppointmentList,
        getAllAppointments,
        cancelAppointment,
        getDashData, dashData
    }

    return (
        <AdminContext.Provider value={value} >
            {props.children}
        </AdminContext.Provider>
    )

}


export default AdminContextProvider