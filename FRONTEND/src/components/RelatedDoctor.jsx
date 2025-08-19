import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const RelatedDoctor = ({ docId, speciality }) => {


    const { doctors } = useContext(AppContext);
    const navigate = useNavigate()

    const [relDoc, setRelDoc] = useState([])


    useEffect(() => {
        if (doctors.length > 0) {
            const doctorData = doctors.filter((item) => item.speciality.toLowerCase() === speciality.toLowerCase() && item._id !== docId);
            setRelDoc(doctorData);

        }
    }, [docId, speciality, doctors])



    return (
        <div className='flex flex-col items-center gap-4 text-gray-900 my-16 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm '>simple browser through our extensive list of trusted doctors.</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-3 sm:px-0'>

                {relDoc.slice(0, 5).map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-primary rounded-lg overflow-hidden cursor-pointer group' key={index}>
                        <img className='bg-green-50 group-hover:scale-105 transition-all duration-500' src={item.image} alt="" />
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-700' : 'text-red-700'}`}>
                                <p className={item.available ? 'w-2 h-2 bg-green-700 rounded-full' : 'w-2 h-2 bg-red-700 rounded-full'}></p><p> {item.available ? "Available" : "UnAvailable"} </p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigate(`/doctors`); scrollTo(0, 0) }} className='bg-green-100 text-gray-600 px-12 py-3 rounded-md mt-10'>more</button>
        </div>
    )
}

export default RelatedDoctor