import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { docToken, profileData, setProfileData, getDoctorProfileData, backendUrl } = useContext(DoctorContext);
  const { currencySymbol } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);


  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const {data} = await axios.post(backendUrl + '/api/doctor/update-profile',updateData, {headers: {docToken}})
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getDoctorProfileData()
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  }

  useEffect(() => {
    if (docToken) getDoctorProfileData();
  }, [docToken]);

  return profileData && (
    <div className="max-w-4xl m-5 p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="shrink-0">
          <img src={profileData.image} alt="" className="w-44 h-44 rounded-md bg-primary object-cover shadow" />
        </div>

        <div className="flex-1 space-y-4">
          <p className="text-2xl font-bold text-gray-800">{profileData.name}</p>

          <div className="text-gray-600">
            <p className="text-lg">{profileData.degree} - {profileData.speciality}</p>
            <button className="mt-1 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded">{profileData.experiance}</button>
          </div>

          <div>
            <p className="font-semibold text-gray-700">About:</p>
            <p className="text-gray-600">{profileData.about}</p>
          </div>

          <p className="text-gray-800 font-medium">
            Appointment Fees: {currencySymbol}
            {isEdit ? (
              <input
                type="number"
                className="border rounded px-3 py-1 w-28 ml-1"
                onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                value={profileData.fees}
              />
            ) : (
              <span className="text-black ml-1">{profileData.fees}</span>
            )}
          </p>

          <div className="text-gray-700">
            <p className="font-semibold">Address:</p>
            <p>
              {isEdit ? (
                <input
                  type="text"
                  className="border rounded px-3 w-full"
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                  value={profileData.address.line1}
                />
              ) : profileData.address.line1}
            </p>
            <br />
            <p>
              {isEdit ? (
                <input
                  type="text"
                  className="border rounded px-3 w-full"
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                  value={profileData.address.line2}
                />
              ) : profileData.address.line2}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
              checked={profileData.available}
              type="checkbox"
              className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label className="text-gray-700">Available</label>
          </div>

          {isEdit ? (
            <button
              onClick={updateProfile}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="mt-2 px-4 py-2 bg-zinc-600 text-white rounded hover:bg-zinc-700"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
