import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  // const paymentSystemByRazorpay = async (appointmentId) => {
  //   try {

  //     const {data} = await axios.post(backendUrl + '/api/user/payment-razorpay', {appointmentId}, {headers:{token}})

  //     if (data.success) {
  //       console.log(data.order);

  //     }

  //   } catch (error) {
  //     console.log(error)
  //     toast.error(error.message)
  //   }
  // }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <p className="text-2xl font-semibold mb-6 text-center sm:text-left">My Appointments</p>
      <div className="flex flex-col gap-6">
        {appointments.map((item, index) => (
          <div key={index} className="border rounded-2xl shadow-md p-4 flex flex-col sm:flex-row gap-4 relative">
            <div className="w-full sm:w-36 flex-shrink-0">
              <img src={item.docData.image} alt="" className="w-40 h-36 object-cover object-center rounded-lg bg-primary mx-auto sm:mx-0" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold">{item.docData.name}</p>
              <p className="text-sm text-gray-600 mb-2">{item.docData.speciality}</p>
              <p className="text-sm font-semibold">Address:</p>
              <p className="text-sm text-gray-700">{item.docData.address.line1}</p>
              <p className="text-sm text-gray-700">{item.docData.address.line2}</p>
              <p className="text-sm mt-2">
                <span className="font-semibold">Date & Time:</span> {item.slotDate} | {item.slotTime}
              </p>
            </div>
            <div className="sm:relative min-h-[40px] sm:min-h-0 sm:w-50">
              <div className="sm:absolute bottom-4 right-4 flex flex-col gap-2 w-full sm:w-[90%] mt-4 sm:mt-0">

                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button className="border border-red-500 rounded-md text-red-500 px-2 py-1">
                    Fees Paid
                  </button>
                )}

                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button className="bg-lime-600 text-white px-2 py-1 rounded hover:bg-blue-600 transition">
                    Pay Online
                  </button>
                )}

                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="bg-lime-600 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >Cancel Appointment
                  </button>
                )}

                {item.cancelled && !item.isCompleted && (
                  <button className="border border-red-500 rounded-md text-red-500 px-2 py-1">
                    Cancelled
                  </button>
                )}

                {item.isCompleted && (
                  <button className="border border-green-500 rounded-md text-green-500 px-2 py-1">
                    Completed
                  </button>
                )}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
