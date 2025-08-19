import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

  const navigate = useNavigate();

  return (
    <div className='flex bg-primary flex-col rounded-md gap-4 px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 text-gray-900 md:flex-row'>
      {/* <-------left side banner--------> */}
      <div className='w-1/2'>
        <div className='flex flex-col py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 gap-4 sm:text-2xl md:text-3xl lg:text-4xl text-white font-semibold text-center md:text-left'>
          <p>Book Appointments with</p>
          <p className='mt-2'>Certified Bio-Remedy Experts</p>
        </div>
        <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className='bg-white text-sm sm:text-base rounded-md my-2 px-5 py-3 hover:scale-105 transition-all'>
          Explore Remedies
        </button>
      </div>

      {/* <-------right side banner-------> */}
      <div className='hidden md:block md-1/2 lg:w-[500px] relative'>
        <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
      </div>
    </div>
  )
}

export default Banner
