import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'

const slides = [
  {
    title: 'Book Appointment with the best doctors',
    desc: 'Simple, fast and easy way to book an appointment with the best doctors in your area.',
    img: assets.header_img1,
  },
  {
    title: 'Your Health, Our Priority',
    desc: 'Find top specialists and schedule visits with ease.',
    img: assets.header_img2,
  },
  {
    title: 'Trusted by Thousands',
    desc: 'Join thousands who trust our service for their healthcare needs.',
    img: assets.header_img3,
  }
]

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-hidden w-full bg-primary text-white rounded-lg">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="min-w-full flex flex-col md:flex-row pt-12 px-4 md:px-8 lg:px-16">
            {/* Left */}
            <div className="md:w-1/2 flex flex-col items-start justify-center py-10 gap-4 m-auto md:py-[6vw]">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                {slide.title}
              </p>
              <div className="flex flex-col md:flex-row items-center gap-4 text-sm font-light">
                <img className="w-24" src={assets.group_profiles} alt="" />
                <p>{slide.desc}</p>
              </div>
              <a
                className="flex items-center gap-2 bg-white px-8 py-3 rounded-md text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
                href="#speciality"
              >
                Book Appointment
                <img src={assets.arrow_icon} alt="" />
              </a>
            </div>

            {/* Right */}
            <div className="md:w-1/2 relative">
              <img className="w-full md:absolute bottom-0 h-auto rounded-md" src={slide.img} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Header
