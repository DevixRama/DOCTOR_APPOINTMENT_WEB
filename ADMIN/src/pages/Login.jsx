import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom' // ✅ Add this line

export const Login = () => {

    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setAdminToken, backendUrl } = useContext(AdminContext)
    const { setDocToken } = useContext(DoctorContext)

    const navigate = useNavigate() // ✅ Initialize navigate

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
                if (data.success) {
                    localStorage.setItem('adminToken', data.token)
                    setAdminToken(data.token);
                    // optionally: navigate('/admin/dashboard')
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
                if (data.success) {
                    localStorage.setItem('docToken', data.token)
                    setDocToken(data.token);
                    navigate('/doctor/doctor-dashboard') // ✅ Redirect to correct route
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-sm">
                <p className="text-2xl font-semibold text-center mb-6">
                    <span className="capitalize text-primary">{state}</span> Login
                </p>
                <div className="space-y-4">
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required placeholder='Email'
                        className="w-full px-4 py-2 border border-[#DADADA] rounded-md focus:outline-none" />
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required placeholder='Password'
                        className="w-full px-4 py-2 border border-[#DADADA] rounded-md focus:outline-none" />
                    <button type='submit'
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition">
                        Login
                    </button>
                    {
                        state === "Admin"
                            ? <p className='text-sm'>Doctor Login? <span className='underline text-primary cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
                            : <p className='text-sm'>Admin Login? <span className='underline text-primary cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
                    }
                </div>
            </div>
        </form>
    )
}
