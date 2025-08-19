import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

    const { adminToken, setAdminToken } = useContext(AdminContext)
    const {docToken, setDocToken} = useContext(DoctorContext)

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        adminToken && setAdminToken('')
        adminToken && localStorage.removeItem('adminToken')
        docToken && setDocToken('')
        docToken && localStorage.removeItem('docToken')
    }
    
    return (
        <div className="w-full bg-white shadow-md border border-gray-300 py-2 px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <img src={assets.admin_logo} alt="" className="h-16 w-auto" />
                <p className="text-lg rounded-md bg-slate-200 px-3 py-2 font-semibold text-gray-700"> {adminToken ? 'Admin' : 'Doctor'} </p>
            </div>
            <button onClick={logout} className="bg-primary text-white px-4 py-2 rounded hover:bg-red-400 transition">
                Logout
            </button>
        </div>
    )
}

export default Navbar
