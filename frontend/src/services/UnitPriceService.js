import axios from "axios"
import {toast} from "react-toastify"
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL


export const fetchUnitPrice = async()=>{
    try{
        const responce = await axios.get(`${BACKEND_URL}/api/unit/`)
        return responce.data

    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)
    }
}

export const updateUnitPrice = async(unitData) =>{
    try{
        const responce = await axios.patch(`${BACKEND_URL}/api/unit/`,unitData)
        return responce.data

    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            toast.error(message)
    }
}