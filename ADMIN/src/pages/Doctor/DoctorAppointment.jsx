import React, { useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointment = () => {
  const { docToken, appointments, getAllAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, currencySymbol } = useContext(AppContext);

  useEffect(() => {
    if (docToken) {
      getAllAppointments();
    }
  }, [docToken]);

  return (
    <div className='w-full max-w-6xl m-8'>
      <h2 className='mb-3 text-lg font-medium'>My Appointments</h2>
      <div className='bg-white border shadow-md rounded-md text-sm max-h-[80vh] min-h-[65vh] overflow-y-scroll'>
        <div className='hidden sm:grid text-center grid-cols-[0.5fr_3fr_2fr_1fr_2.5fr_1fr_1fr] py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className='flex flex-wrap justify-between items-center text-center max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_2fr_1fr_2.5fr_1fr_1fr] sm:place-items-center text-gray-500 py-3 px-5 border-b hover:bg-gray-50'
          >
            <p className='max-sm:hidden'>{index + 1}</p>

            <div className='flex justify-center items-center gap-2'>
              <img className='w-10 h-10 rounded-full' src={item.userData.image} alt="Patient" />
              <p>{item.userData.name}</p>
            </div>

            <p>{item.payment ? 'Online' : 'Cash'}</p>
            <p>{calculateAge(item.userData.dob)}</p>
            <p>{item.slotDate}, {item.slotTime}</p>
            <p>{currencySymbol} {item.amount}</p>


            {item.cancelled
              ? <span className='font-medium text-red-600'>Cancelled</span>
              : item.isCompleted
                ? <span className='font-medium text-green-600'>Completed</span>
                : <div className="flex gap-2 justify-center items-center">
                  <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="cancel" />
                  <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="tick" />
                </div>
            }



          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
