import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, adminToken, getAllDoctors, changeAvailability} = useContext(AdminContext)

  useEffect(() => {
    if (adminToken) {
      getAllDoctors()
    }
  }, [adminToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='flex w-full m-2 flex-wrap gap-6 pt-2 gap-y-2'>
        {
          doctors.map((item, index) => (
            <div className='rounded-lg shadow-md border-t-4 max-w-56 overflow-hidden cursor-pointer group' key={index} >
              <img className='group-hover:scale-105 transition-all duration-500' src={item.image} alt="" />
              <div className='p-2'>
                <p className='text-lg font-medium'>{item.name}</p>
                <p className='text-gray-500 text-lg font-medium'>{item.speciality}</p>
                <div className='flex mt-2 items-center gap-1 text-sm'>
                  <input onChange={()=> changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList