import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/authService'
import { SET_LOGIN, SET_NAME } from '../../redux/feartures/auth/authSlice';

const  initialState = {
    name:"",
    Email:"",
    password:"",
    phone:"",
    NIC:"",
    Address:"",
    city:"",
    district:"",
    AccountID:"",
}

const Register = () => {
    const  [formData,setformData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {name, Email, password,NIC,phone,ActiveStatus,Address,district,city,AccountID} =formData

    const  handleInputChange = (e) =>{
        const {name,value} = e.target
        setformData({...formData,[name]:value})
    }

    const register = async(e)=>{
        e.preventDefault()

        const userData = {
          name, Email, password,NIC,phone,ActiveStatus,Address,district,city,AccountID
        }

        try{
          const data = await registerUser(userData)
          await dispatch(SET_LOGIN(true))
          await dispatch(SET_NAME(data.name))
          navigate("/cistomer-dashbord")
          setIsLoading(false)

        }catch(error){
          toast.error(error.message)
        }
    }
   
  return (
    <div>
      <center>
        <form onSubmit={register}>
          <input type='text' placeholder='Name' name='name' value={name} onChange={handleInputChange}/>
          <input type='text' placeholder='Email' name='Email' value={Email} onChange={handleInputChange}/>
          <input type='text' placeholder='password' name='password' value={password} onChange={handleInputChange}/>
          <input type='text' placeholder='Address' name='Address' value={Address} onChange={handleInputChange}/>
          <button type='submit' >Submit</button>

        </form>
      </center>


    </div>
  )
}

export default Register