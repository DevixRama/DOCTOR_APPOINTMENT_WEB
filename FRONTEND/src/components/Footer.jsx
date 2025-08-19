import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>
                {/* <--left section--> */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='leading-6 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab praesentium minima asperiores distinctio officiis accusamus repudiandae sint officia pariatur eaque. Enim eaque fugit placeat animi porro sunt iste quos sapiente.</p>
                </div>
                {/* <--left section--> */}
                <div>
                    <p className='leading-6 font-medium mb-4'>COMPANY</p>
                    <ul className='text-gray-600 flex flex-col gap-2'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contect us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                {/* <--left section--> */}
                <div>
                    <p className='leading-6 font-medium mb-4'>GET IN TOUCH</p>
                    <ul className='text-gray-600 flex flex-col gap-2'>
                        <li>+1-212-323-4230</li>
                        <li>test@gmail.com</li>
                    </ul>

                </div>
            </div>

            {/* <---copyright section---> */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>copyright 2025@ icrb - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer