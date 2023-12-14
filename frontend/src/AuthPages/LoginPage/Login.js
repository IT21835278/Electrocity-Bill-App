import React, { useState } from 'react'
import { LoginUser, validateEmail } from '../../services/authService'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { SET_LOGIN, SET_NAME } from '../../redux/feartures/auth/authSlice'
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';

const initialState={
  Email:"",
  password:"",
}

export const Login=()=> {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[isLoading, setIsLoading] = useState(false)
  const[formData,setformData] = useState(false)
  const{Email,password} = formData

  const handleInputChange = (e)=>{
    const{name,value}  = e.target
    setformData({...formData,[name]:value})
  }

  const login = async(e)=>{
    e.preventDefault()
    if(!Email||!password){
      return toast.warning("Enter email and password")
    }

    if(!validateEmail(Email)){
      return toast.warning("Not valid Email")
     
    }

    const userData={
      Email,password
    }

    setIsLoading(true)
    try{
      const data= await LoginUser(userData)
      console.log(data);
      await dispatch(SET_LOGIN(true))
      // await dispatch(SET_NAME(data.name))
      navigate("/Customerdashbord")
      setIsLoading(false);
    }catch(error){
      setIsLoading(false)
      toast.error(error.message)

    }

  }
  return (
    <div>
      {/* <Form className='bg-black'>
      <Form.Group className="mb-3 " controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="password" placeholder="Enter Password" />
      </Form.Group>

      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form> */}

    <form onSubmit={login}>
      <h1>Login</h1>
      <input type='email' placeholder='Enter Email' name='Email' value={Email} onChange={handleInputChange}/><br/>
      <input type='password' placeholder='Enter Password' name='password' value={password} onChange={handleInputChange}/><br/>
      <button type='submit'>Login</button>
    </form>
    </div>
  )
}

export default Login
