import axios from "axios"
import {toast} from "react-toastify"
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL


//fetch all user details
export const getAllUser = async()=>{
    try{
        const responce = await axios.get(`${BACKEND_URL}/api/users/all-users`)
        return responce.data

    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)
    }
}


//get single user
export const getUserByID = async(userId) =>{
    try{
        const responce = await axios.get(`${BACKEND_URL}/api/users/get-user/${userId}`)
        return responce.data

    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)
    }

}


//enter new meter reading
export const CalBill = async(MeterRreading) =>{
    try{
        const responce = await axios.post(`${BACKEND_URL}/api/bill/`,MeterRreading)
        if(responce.statusText ==="OK"){
            console.log("Success full entered!");
            
        }

    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)
    }
}