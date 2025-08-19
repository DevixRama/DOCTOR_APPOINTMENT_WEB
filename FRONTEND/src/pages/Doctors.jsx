import { React, useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {

  const { speciality } = useParams();
  const navigate = useNavigate();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false)

  const { doctors } = useContext(AppContext);



  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((item) => item.speciality.toLowerCase() === speciality.toLowerCase()));
    } else {
      setFilterDoc(doctors);
    }
  }


  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);


  return (
    <div>
      <h1 className='text-gray-600'>Browse throught the doctors speciality</h1>
      <div className='flex flex-col sm:flex-row items-start gap-4 mt-6 md:mt-4'>
        <button className={`py-1 px-3 border rounded-md text-sm transition-all sm:hidden ${showFilter ? 'bg-lime-500 text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex-col gap-2 text-gray-600 text-sm sm:text-base w-full sm:w-auto ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'Psychologist' ? navigate('/doctors') : navigate('/doctors/Psychologist')} className={`px-5 py-3 text-white bg-btn border-none rounded-b-md transition-all cursor-pointer text-center ${speciality === "Psychologist" ? "text-black bg-indigo-100" : ""}`}>Psychologist</p>
          <p onClick={() => speciality === 'Yogatherapist' ? navigate('/doctors') : navigate('/doctors/Yogatherapist')} className={`px-5 py-3 text-white bg-btn border-none rounded-b-md transition-all cursor-pointer text-center ${speciality === "Yogatherapist" ? "text-black bg-indigo-100" : ""}`}>Yogatherapist</p>
          <p onClick={() => speciality === 'Physiotherapist' ? navigate('/doctors') : navigate('/doctors/Physiotherapist')} className={`px-5 py-3 text-white bg-btn border-none rounded-b-md transition-all cursor-pointer text-center ${speciality === "Physiotherapist" ? "text-black bg-indigo-100" : ""}`}>Physiotherapist</p>
          <p onClick={() => speciality === 'Ayurvedacharya' ? navigate('/doctors') : navigate('/doctors/Ayurvedacharya')} className={`px-5 py-3 text-white bg-btn border-none rounded-b-md transition-all cursor-pointer text-center ${speciality === "Ayurvedacharya" ? "text-black bg-indigo-100" : ""}`}>Ayurvedacharya</p>
          <p onClick={() => speciality === 'Naturopath' ? navigate('/doctors') : navigate('/doctors/Naturopath')} className={`px-5 py-3 text-white bg-btn border-none rounded-b-md transition-all cursor-pointer text-center ${speciality === "Naturopath" ? "text-black bg-indigo-100" : ""}`}>Naturopath</p>
          <p onClick={() => speciality === 'Homeopath' ? navigate('/doctors') : navigate('/doctors/Homeopath')} className={`px-5 py-3 text-white bg-btn border-none rounded-b-md transition-all cursor-pointer text-center ${speciality === "Homeopath" ? "text-black bg-indigo-100" : ""}`}>Homeopath</p>
        </div>


        <div className='flex flex-wrap gap-4 w-full px-2 sm:px-0'>
          {
            filterDoc.map((item, index) => (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
                className='sm:w-[190px] md:w-[230px] rounded-lg overflow-hidden shadow-md border-t-4 cursor-pointer group'
                key={index}
              >
                <img className='w-full md:h-50 object-cover group-hover:scale-105 transition-all duration-500' src={item.image} alt="" />
                <div className='py-2 px-4'>
                  <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-700' : 'text-red-700'}`}>
                    <p className={item.available ? 'w-2 h-2 bg-green-700 rounded-full' : 'w-2 h-2 bg-red-700 rounded-full'}></p><p> {item.available ? "Available" : "UnAvailable"} </p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>



      </div>
    </div>
  )
}

export default Doctors
