import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const { token, setToken, userData } = useContext(AppContext)


  const [showMenu, setShowMenu] = useState(false)


  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }



  return (
    <div className='flex justify-between text-sm items-center w-full bg-white px-4 py-2 shadow-md m-2'>

      <img onClick={() => { navigate('/') }} className='w-[200px] cursor-pointer' src={assets.logo} alt="" />

      <ul className='hidden md:flex gap-4 items-start font-medium'>
        <NavLink to={"/"}>
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-btn w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-btn w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to={"/about"}>
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-btn w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-btn w-3/5 m-auto hidden' />
        </NavLink>
      </ul>

      <div className='flex gap-4 items-center'>
        {
          token && userData ? (
            <div className='relative group cursor-pointer'>
              <div className='flex gap-2 items-center'>
                <img className='w-12 h-12 object-cover rounded-full' src={userData.image} alt="" />
                <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              </div>

              <div className='hidden group-hover:flex flex-col absolute right-0 pt-4 text-base text-gray-600 font-medium bg-white rounded-md p-2 z-20 min-w-48 shadow-md'>
                <p onClick={() => navigate('/my-profile')} className='hover:bg-zinc-200 p-2 cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className='hover:bg-zinc-200 p-2 cursor-pointer'>My Appointment</p>
                <p onClick={() => logout()} className='hover:bg-zinc-200 p-2 cursor-pointer'>Logout</p>
              </div>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className='bg-btn px-4 py-2 text-white rounded-md hidden md:block'>
              Create Account
            </button>
          )
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />


        {/* <----------mobile menu----------> */}
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="" />
            <img className='w-8' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col gap-2 mt-5 px-5 text-xl font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'> <p className='px-4 py-2 rounded-md inline-block w-full'   >HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'> <p className='px-4 py-2 rounded-md inline-block w-full'   >ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'> <p className='px-4 py-2 rounded-md inline-block w-full'   >ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'> <p className='px-4 py-2 rounded-md inline-block w-full'   >CONTACT</p></NavLink>
          </ul>
        </div>


      </div>
    </div>
  )
}

export default Navbar
