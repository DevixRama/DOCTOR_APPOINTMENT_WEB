import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {

    const navigate = useNavigate();
    const { doctors } = React.useContext(AppContext);

    return (
        <div className='flex flex-col items-center gap-4 mb-14 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm '>simple browser through our extensive list of trusted doctors.</p>
            <div className='grid grid-cols-auto gap-6 gap-y-6 w-full px-2 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className='rounded-lg border-t-4 shadow-md overflow-hidden cursor-pointer group' key={index}>
                        <img className='group-hover:scale-105 transition-all duration-500' src={item.image} alt="" />
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-700' : 'text-red-700' }`}>
                                <p className={item.available ? 'w-2 h-2 bg-green-700 rounded-full' : 'w-2 h-2 bg-red-700 rounded-full' }></p><p> {item.available ? "Available" : "UnAvailable"} </p>
                            </div>
                            <p className='text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={()=>{navigate(`/doctors`); scrollTo(0,0)}} className='bg-green-100 text-gray-600 px-12 py-3 rounded-md mt-10'>more</button>
        </div>
    )
}

export default TopDoctors