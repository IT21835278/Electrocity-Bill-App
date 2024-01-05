import axios from "axios"
import { toast } from "react-toastify";
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

export const validateEmail = (Email) =>{
    return Email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}


//login
export const LoginUser = async(userData) =>{
    try{
        // console.log(userData)

        const response = await axios.post(`${BACKEND_URL}/api/users/login`,userData)
        if(response==="OK"){
            toast.success("Login successfuly!...")
        }
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString()
        toast.error(message)
    }
}

export const Logout = async() =>{
    try{
        const respone = await axios.get(`${BACKEND_URL}/api/users/`)
        if(respone==="OK"){
            console.log("log out user");
            toast.success("Login logout...")
        }
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)
    }
}


//register user
export const registerUser = async(userData)=>{
    try{
        const  response = await axios.post(`${BACKEND_URL}/api/users/register`,userData,{ withCredentials: true })
        console.log(userData);
        if(response.statusText ==="OK"){
            toast.success("Registration successfuly!...")
            
        }
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)
    }
}


