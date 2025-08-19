import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
  const { userData, token, backendUrl, getUserProfileData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [editableData, setEditableData] = useState(null)
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (userData) setEditableData({ ...userData })
  }, [userData])

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', editableData.name || '')
      formData.append('phone', editableData.phone || '')
      formData.append('address', JSON.stringify(editableData.address || {}))
      formData.append('gender', editableData.gender || '')
      formData.append('dob', editableData.dob || '')
      if (image) formData.append('image', image)

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: { token }
      })

      if (data.success) {
        toast.success(data.message)
        await getUserProfileData()
        setIsEdit(false)
        setImage(null)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Profile update failed")
      console.error("Update error:", error)
    }
  }

  if (!editableData) return null

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">

        <div className="flex flex-col md:flex-row items-center gap-4">
          {isEdit ? (
            <label htmlFor="image">
              <div className="relative cursor-pointer w-[90px] h-[90px] flex items-center justify-center">
                <img
                  className="w-[90px] h-[90px] object-cover rounded-full opacity-50 block"
                  src={image ? URL.createObjectURL(image) : editableData.image}
                  alt="User Profile"
                />
                {!image && (
                  <img
                    className="w-10 h-10 absolute"
                    src={assets.upload_icon}
                    alt="Upload Icon"
                  />
                )}
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              className="w-[92px] h-[80px] rounded-full object-cover"
              src={editableData.image}
              alt="Profile"
            />
          )}

          <div className="w-full">
            {isEdit ? (
              <input
                type="text"
                value={editableData.name}
                onChange={(e) =>
                  setEditableData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="border text-sm border-gray-300 rounded px-3 py-1 w-full"
              />
            ) : (
              <p className="text-xl font-semibold">{editableData.name}</p>
            )}
          </div>
        </div>


        <hr className="my-4 border-gray-300" />

        <div className="flex flex-col justify-center gap-6">

          {/* Contact Info */}
          <div>
            <p className="text-lg font-semibold mb-4">Contact Information</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <p className="text-sm font-medium w-24">Email ID:</p>
                <p className="text-gray-700 break-words">{editableData.email}</p>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-sm font-medium w-24">Phone:</p>
                {isEdit ? (
                  <input
                    type="text"
                    value={editableData.phone}
                    onChange={(e) =>
                      setEditableData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="border text-sm border-gray-300 rounded px-3 py-1 flex-1"
                  />
                ) : (
                  <p className="text-gray-700 break-words">{editableData.phone}</p>
                )}
              </div>

              <div className="flex items-start gap-4">
                <p className="text-sm font-medium w-24">Address:</p>
                {isEdit ? (
                  <div className="space-y-2 text-sm flex-1">
                    <input
                      value={editableData.address?.line1 || ''}
                      onChange={(e) =>
                        setEditableData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      className="border text-sm border-gray-300 rounded px-3 py-1 w-full"
                    />
                    <input
                      value={editableData.address?.line2 || ''}
                      onChange={(e) =>
                        setEditableData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      className="border text-sm border-gray-300 rounded px-3 py-1 w-full"
                    />
                  </div>
                ) : (
                  <p className="text-gray-700 text-sm whitespace-pre-line">
                    {editableData.address?.line1}
                    <br />
                    {editableData.address?.line2}
                  </p>
                )}
              </div>
            </div>
          </div>


          {/* Basic Info */}
          {/* Basic Info */}
          <div>
            <p className="text-lg font-semibold mb-4">Basic Information</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <p className="text-sm font-medium w-24">Gender:</p>
                {isEdit ? (
                  <select
                    value={editableData.gender}
                    onChange={(e) =>
                      setEditableData((prev) => ({ ...prev, gender: e.target.value }))
                    }
                    className="border text-sm border-gray-300 rounded px-3 py-1 w-full"
                  >
                    <option value="not Seleted">not Seleted</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                ) : (
                  <p className="text-gray-700">{editableData.gender}</p>
                )}
              </div>

              <div className="flex items-center gap-4">
                <p className="text-sm font-medium w-24">Birthday:</p>
                {isEdit ? (
                  <input
                    type="date"
                    value={editableData.dob}
                    onChange={(e) =>
                      setEditableData((prev) => ({ ...prev, dob: e.target.value }))
                    }
                    className="border border-gray-300 text-sm rounded px-3 py-1 w-full"
                  />
                ) : (
                  <p className="text-gray-700">{editableData.dob}</p>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-4 text-right">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className='bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded w-32 text-white'
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className='bg-gray-500 hover:bg-gray-600 px-4 py-1 rounded w-32 text-white'
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyProfile
