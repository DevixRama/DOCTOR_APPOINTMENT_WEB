import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
    
    const {adminToken} = useContext(AdminContext)
    const {docToken} = useContext(DoctorContext)
    return (
        <div className="min-w-64 min-h-screen bg-white border border-r-gray-300">
            {
                adminToken && <ul className="flex flex-col gap-4">
                    <NavLink to={'/admin-dashboard'} className={({isActive}) => `flex items-center gap-3 px-3 py-4 text-gray-700 cursor-pointer ${isActive ? `bg-blue-50 border-r-4 border-primary`:''}` }>
                        <img src={assets.home_icon} alt="" className="w-6 h-6" />
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink to={'/all-allappointments'} className={({isActive}) => `flex items-center gap-3 px-3 py-4 text-gray-700 cursor-pointer ${isActive ? `bg-blue-50 border-r-4 border-primary`:''}` }>
                        <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
                        <p>Appointments</p>
                    </NavLink>
                    <NavLink to={'/add-doctor'} className={({isActive}) => `flex items-center gap-3 px-3 py-4 text-gray-700 cursor-pointer ${isActive ? `bg-blue-50 border-r-4 border-primary`:''}` }>
                        <img src={assets.add_icon} alt="" className="w-6 h-6" />
                        <p>Add Doctor</p>
                    </NavLink>
                    <NavLink to={'/doctor-list'} className={({isActive}) => `flex items-center gap-3 px-3 py-4 text-gray-700 cursor-pointer ${isActive ? `bg-blue-50 border-r-4 border-primary`:''}` }>
                        <img src={assets.people_icon} alt="" className="w-6 h-6" />
                        <p>Doctor List</p>
                    </NavLink>
                </ul>
            }



            {
                docToken && <ul className="flex flex-col gap-4">
                    <NavLink to={'/doctor-dashboard'} className={({isActive}) => `flex items-center gap-3 px-3 py-2 text-gray-700 cursor-pointer ${isActive ? `bg-blue-50 border-r-4 border-primary`:''}` }>
                        <img src={assets.home_icon} alt="" className="w-6 h-6" />
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink to={'/doctor-appointments'} className={({isActive}) => `flex items-center gap-3 px-3 py-2 text-gray-700 cursor-pointer ${isActive ? `bg-blue-50 border-r-4 border-primary`:''}` }>
                        <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
                        <p>Appointments</p>
                    </NavLink>
                    <NavLink to={'/doctor-profile'} className={({isActive}) => `flex items-center gap-3 px-3 py-2 text-gray-700 cursor-pointer ${isActive ? `bg-blue-50 border-r-4 border-primary`:''}` }>
                        <img src={assets.add_icon} alt="" className="w-6 h-6" />
                        <p>Profile</p>
                    </NavLink>
                </ul>
            }
        </div>
    )
}

export default Sidebar
