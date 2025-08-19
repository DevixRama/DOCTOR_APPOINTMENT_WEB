import { createContext } from 'react';
// import { doctors } from '../assets/assets';
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify'



export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = "₹"; // Define the currency symbol here
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors, setdoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData, setUserData] = useState(false)


    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setdoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    const getUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    const value = {
        doctors, getDoctorsData,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData, setUserData,
        getUserProfileData
    }



    useEffect(() => {
        getDoctorsData()
    }, [])


    useEffect(() => {
        if (token) {
            getUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}


export default AppContextProvider;