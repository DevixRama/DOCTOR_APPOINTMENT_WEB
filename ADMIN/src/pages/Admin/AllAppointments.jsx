import React, { useEffect, useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'


const AllAppointments = () => {
  const { adminToken, appointmentList, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, currencySymbol } = useContext(AppContext)
 


  useEffect(() => {
    if (adminToken) {

      getAllAppointments()
    }
  }, [adminToken])



  return (
    <div className='w-full max-w-6xl m-8'>
      <h2 className='mb-3 text-lg font-medium'>All Appointments</h2>
      <div className='bg-white border shadow-md rounded-md text-sm max-h-[80vh] min-h-[65vh] overflow-y-scroll'>
        <div className='hidden sm:grid text-center grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointmentList.map((item, index) => (
          <div className='flex flex-wrap justify-between items-center text-center max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] sm:place-items-center text-gray-500 py-3 px-5 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex justify-center items-center gap-2'>
              <img className='w-10 h-10 rounded-full' src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>
            <p>{calculateAge(item.userData.dob)}</p>
            <p>{item.slotDate}, {item.slotTime}</p>
            <div className='sm:grid sm:grid-cols-[1fr_4fr]'>
              <img className='w-10 h-10 border rounded-full' src={item.docData.image} alt="" />
              <p>{item.docData.name}</p>
            </div>
            <p>{currencySymbol} {item.amount}</p>
            {
              item.cancelled
                ? <p className='px-3 py-2 text-red-600'>Cancelled</p>
                : item.isCompleted
                ? <p className='px-3 py-2 text-green-600'>Completed</p>
                : <img onClick={() =>cancelAppointment(item._id)} className='w-12 cursor-pointer' src={assets.cancel_icon} alt="" />
            }
          </div>
        ))}
      </div>
    </div>
  )
}



export default AllAppointments
