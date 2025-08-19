import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctor from '../components/RelatedDoctor';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {

  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData, userData } = useContext(AppContext);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((item) => item._id === docId);
    setDocInfo(docInfo);
  }

  const getAvailableSlots = async () => {
    if (!docInfo || !docInfo.slots_booked) return; // <-- Add this line
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = `${day} ${currentDate.toLocaleString('default', { month: 'short' })} ${year}`;
        const slotTime = formattedTime;

        const isSlotAvailable = !(
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
        );

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prev => [...prev, timeSlots]);
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    if (!slotTime) {
      return toast.warn("Please select a time slot");
    }

    try {
      const date = docSlots[slotIndex][0].dateTime;
      let day = date.getDate();
      let year = date.getFullYear();
      const slotDate = `${day} ${date.toLocaleString('default', { month: 'short' })} ${year}`;

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        {
          docId,
          slotDate,
          slotTime,
          userId: userData._id,
          userData,
          docData: docInfo,
          amount: docInfo.fees,
          date: date.getTime()
        },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);


  return docInfo && (
    <div className="p-4 sm:p-6">
      {/* Doctor Info */}
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <img className="w-40 h-40 sm:w-72 sm:h-72 object-cover object-center rounded-md bg-primary" src={docInfo.image} alt="" />
        <div className="flex-1 border border-gray-300 bg-white p-6 rounded-md shadow-sm w-full">
          <div className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </div>
          <div className="text-sm text-gray-600 mt-1 flex flex-wrap items-center gap-2">
            <span>{docInfo.degree} - {docInfo.speciality}</span>
            <span className="text-xs font-semibold border px-2 py-0.5 rounded">{docInfo.experiance}</span>
          </div>
          <div className="mt-4">
            <p className="font-medium text-gray-900 flex items-center gap-1">About <img src={assets.info_icon} alt="" /></p>
            <p className="text-sm text-gray-600 mt-1">{docInfo.about}</p>
          </div>
          <p className="mt-4 text-sm text-gray-800">
            Appointment fee: <span className="text-gray-600 font-medium">{currencySymbol} {docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Slots */}
      <div className="w-full mt-8 flex flex-col items-center text-center">
        <p className="font-medium text-gray-800 text-base mb-2">Booking Slots</p>
        <div className="flex gap-3 pb-4">
          {docSlots.length && docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`min-w-16 text-center py-4 px-3 rounded-lg cursor-pointer text-sm font-medium 
                ${slotIndex === index ? 'bg-btn text-white' : 'border border-gray-300 text-gray-700'}`}
            >
              <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
              <p>{item[0] && item[0].dateTime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 overflow-x-auto mt-4 pb-2 scrollbar-hide w-full">
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-light px-5 py-2 rounded-full cursor-pointer flex-shrink-0 
                ${item.time === slotTime ? 'bg-btn text-white' : 'text-gray-600 border border-gray-300'}`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          className="mt-6 bg-btn hover:bg-blue-600 transition text-white text-sm px-8 py-3 rounded-md"
        >
          Book an appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment;
