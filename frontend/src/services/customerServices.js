import axios from "axios"
import { toast } from "react-toastify";
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL


export const getUserByToken = async() =>{
    try{
        const response = await axios.get(`${BACKEND_URL}/api/users/get-single-user`)
        return response.data
      
        }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString()
        toast.error(message)
    }
}


export const getLastMonthRecords = async () =>{
    try{
        const  responce = await axios.get(`${BACKEND_URL}/api/bill/get-last-month-records`)
        return responce.data

    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)
    }
}