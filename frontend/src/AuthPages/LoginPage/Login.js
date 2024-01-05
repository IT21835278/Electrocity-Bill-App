import React, { useState } from 'react';
import { LoginUser, validateEmail } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SET_LOGIN, SET_NAME } from '../../redux/feartures/auth/authSlice';

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
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate('/Customerdashbord');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <center>
      <form onSubmit={login}>
        <h1>Login</h1>
        <input type="email" placeholder="Enter Email" name="Email" value={Email} onChange={handleInputChange} />
        <br />
        <input type="password" placeholder="Enter Password" name="password" value={password} onChange={handleInputChange} />
        <br />
        <button type="submit">Login</button>
      </form>
      </center>
    </div>
  );
};

export default Login;
