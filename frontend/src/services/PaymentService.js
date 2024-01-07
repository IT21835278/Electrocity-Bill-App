import axios from "axios"
import {toast} from "react-toastify"
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL


//pay bill
export const PayBill = async(payData)=>{
    try{
        const responce = await axios.post(`${BACKEND_URL}/api/payment/`,payData)
        if(responce.statusText ==="OK"){
            console.log("Success full paid!");
            
        }

    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)
    }
}

export const paymentHistory = async() =>{
    try{
        const responce = await axios.get(`${BACKEND_URL}/api/payment/`)
        return responce.data
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)
    }
}