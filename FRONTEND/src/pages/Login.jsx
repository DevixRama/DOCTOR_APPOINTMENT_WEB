import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState("Sign Up")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")


  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }else{
         const { data } = await axios.post(backendUrl + '/api/user/login', {password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }

  }


  useEffect(() => {
  if (token) {
    navigate('/')
  }
  }, [token])
  

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center' action="">
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === "Sign Up" ? "Create Account" : "Login"}</p>
        <p>Please {state === "Sign Up" ? "sign up" : "Log in"} to book appointment</p>

        <div className='flex flex-col w-full gap-6'>
          {
            state === "Sign Up" && <input className='px-5 py-3 text-sm font-medium border border-zinc-300' onChange={(e) => setName(e.target.value)} value={name} placeholder='Full Name' type="text" required />
          }

          <input className='px-5 py-3 text-sm font-medium border border-zinc-300' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' type="email" required />
          <input className='px-5 py-3 text-sm font-medium border border-zinc-300' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' type="password" required />
          <button type='submit' className='bg-primary w-full px-4 py-2 rounded-md text-white text-base'>{state === "Sign Up" ? "Create Account" : "Login"}</button>

          {
            state === "Sign Up"
              ? <p>Already have an account? <span onClick={() => setState("Login")} className='text-primary underline cursor-pointer'>Login here</span> </p>
              : <p>Create an new account? <span onClick={() => setState("Sign Up")} className='text-primary underline cursor-pointer'>click here</span> </p>
          }
        </div>
      </div>
    </form>
  )
}

export default Login
