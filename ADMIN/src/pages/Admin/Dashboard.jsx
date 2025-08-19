import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'

const Dashboard = () => {

  const { adminToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)

  useEffect(() => {
    if (adminToken) {
      getDashData()
    }
  }, [adminToken])

  return dashData && (
    <div className=' m-8 p-1 md:p-2'>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div className='flex items-center gap-4 bg-white p-4 rounded-xl border shadow-sm hover:scale-105 transition-transform'>
          <img className='w-14' src={assets.doctor_icon} alt="Doctors" />
          <div>
            <p className='text-xl font-bold text-gray-700'>{dashData.doctors}</p>
            <p className='text-sm text-gray-400'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 rounded-xl border shadow-sm hover:scale-105 transition-transform'>
          <img className='w-14' src={assets.appointments_icon} alt="Appointments" />
          <div>
            <p className='text-xl font-bold text-gray-700'>{dashData.appointments}</p>
            <p className='text-sm text-gray-400'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 rounded-xl border shadow-sm hover:scale-105 transition-transform'>
          <img className='w-12' src={assets.patients_icon} alt="Patients" />
          <div>
            <p className='text-xl font-bold text-gray-700'>{dashData.patients}</p>
            <p className='text-sm text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className='mt-10'>
        <div className='flex items-center gap-3 px-4 py-3 rounded-t-lg bg-white border border-b-0 shadow-sm'>
          <img src={assets.list_icon} alt="Bookings" className='w-6' />
          <p className='font-semibold text-gray-700 text-lg'>Latest Bookings</p>
        </div>

        <div className='border border-t-0 bg-white rounded-b-lg shadow-sm'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div key={index} className='flex items-center justify-between gap-4 p-4 border-t flex-wrap sm:flex-nowrap'>
                <div className='flex items-center gap-4'>
                  <img src={item.docData.image} alt="Doctor" className='w-14 h-14 object-cover rounded-full border' />
                  <div>
                    <p className='font-medium text-gray-700'>{item.docData.name}</p>
                    <p className='text-sm text-gray-500'>{item.slotDate}</p>
                  </div>
                </div>
                <div className='flex justify-center items-center w-1/6'>
                  {
                    item.cancelled
                      ? <p className='px-3 py-1 rounded-[4px] text-red-600'>Cancelled</p>
                      : item.isCompleted
                        ? <p className='px-3 py-1 rounded-[4px] b text-green-600'>Completed</p>
                        : <img onClick={() => cancelAppointment(item._id)} className='w-12 cursor-pointer' src={assets.cancel_icon} alt="" />
                  }
                </div>


              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Dashboard
