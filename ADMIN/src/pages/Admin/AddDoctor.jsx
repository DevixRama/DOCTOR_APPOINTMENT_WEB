import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experiance, setExperiance] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('Psychologist')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')


  const { backendUrl, adminToken } = useContext(AdminContext)


  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (!docImg) {
        return toast.error('image not selected')
      }

      const formData = new FormData()

      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experiance', experiance)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      //console log form daattata
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      })

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { adminToken } })
      if (data.success) {
        toast.success(data.message)
        setDocImg(null)
        setName('')
        setEmail('')
        setPassword('')
        setExperiance('1 Year')
        setFees('')
        setAbout('')
        setSpeciality('Psychologist')
        setDegree('')
        setAddress1('')
        setAddress2('')

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error.message);

    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='m-8 w-full'>
      <p className='mx-2 mb-3 text-lg text-lime-600 font-bold'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-5xl max-h-[75vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500' >
          <label htmlFor="doc-img">
            <img className='w-[100px] bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} className='border rounded px-3 py-2' type="file" id='doc-img' hidden />
          <p>Upload doctor <br /> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>


            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Experiance</p>
              <select onChange={(e) => setExperiance(e.target.value)} value={experiance} >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1' >
              <p>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='fees' required />
            </div>

          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1' >
              <p>Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} >
                <option value="Psychologist">Psychologist</option>
                <option value="Yogatherapist">Yogatherapist</option>
                <option value="Physiotherapist">Physiotherapist</option>
                <option value="Ayurvedacharya">Ayurvedacharya</option>
                <option value="Naturopath">Naturopath</option>
                <option value="Homeopath">Homeopath</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Education' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='Address-1' required />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder='Address-2' required />
            </div>


          </div>

        </div>
        <div className='mt-4 mb-2'>
          <p>About Doctor</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' placeholder='Write about doctor...' rows={5} required />
        </div>

        <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-md'>Add Doctor</button>

      </div>

    </form>
  )
}

export default AddDoctor