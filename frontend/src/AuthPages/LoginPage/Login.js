import React, { useState } from 'react';
import { LoginUser, validateEmail } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SET_LOGIN, SET_NAME } from '../../redux/feartures/auth/authSlice';
import loginIMg from '../../asserts/LoginIMG.jfif';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const initialState = {
  Email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { Email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!Email || !password) {
      return toast.warning('Enter email and password');
    }

    if (!validateEmail(Email)) {
      return toast.warning('Not a valid Email');
    }

    const userData = {
      Email,
      password,
    };

    setIsLoading(true);
    try {
      const data = await LoginUser(userData);
      await dispatch(SET_LOGIN(true));
      // await dispatch(SET_NAME(data.name));
      if(data){
        navigate('/view-bill');
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center h-100">
      <Row>
        <Col xs={12} md={6} className="mt-auto">
          <Image src={loginIMg} rounded style={{ maxWidth: '100%', height: 'auto' }} />
        </Col>
        <Col xs={12} md={6} className="mb-auto">
          <Form onSubmit={login} className="border p-4 bg-light mt-4">
            {/* Add mt-4 to increase top margin */}
            <h1>Login</h1>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" name="Email" value={Email} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" name="password" value={password} onChange={handleInputChange} />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" className="text-center">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
