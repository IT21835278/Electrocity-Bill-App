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
    // <div>
    //   <center>
    //     <form onSubmit={register}>
    //       <input type='text' placeholder='Name' name='name' value={name} onChange={handleInputChange}/>
    //       <input type='text' placeholder='Email' name='Email' value={Email} onChange={handleInputChange}/>
    //       <input type='text' placeholder='password' name='password' value={password} onChange={handleInputChange}/>
    //       <input type='text' placeholder='Address' name='Address' value={Address} onChange={handleInputChange}/>
    //       <button type='submit' >Submit</button>

    //     </form>
    //   </center>


    // </div>

<Container className="d-flex align-items-center justify-content-center h-100">
<Row>
  <Col xs={12} md={6} className="mt-auto">
    <Image src={loginIMg} rounded style={{ maxWidth: '100%', height: 'auto' }} />
  </Col>
  <Col xs={12} md={6} className="mb-auto p-5">
    <Form onSubmit={login} className="border p-4 bg-light mt-4 m-5" style={{}}>
      {/* Add mt-4 to increase top margin */}
      <h1>Register</h1>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" name="Email" value={Email} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" name="password" value={password} onChange={handleInputChange} />
      </Form.Group>
      <div className="d-flex justify-content-center">
        <Button variant="primary" type="submit" className="text-center" style={{margin:'20px'}}>
          Register
        </Button>
      </div>
    </Form>
  </Col>
</Row>
</Container>
);
}

export default Register