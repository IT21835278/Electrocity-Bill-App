import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserByID } from '../../services/meterReadService'
import { toast } from 'react-toastify'
import { PayBill } from '../../services/PaymentService'
import Swal from 'sweetalert2'
import CustomerNavBar from '../../Components/CustomerNavBar'

const Paybill = () => {
  const {userId} = useParams()
  const [user,setUser] = useState(null)
  const [payment,setPay] = useState(0)

  const payData= {
    payment,
    _id:user ? user._id : null
  }


  useEffect(()=>{
    async function fetchUserDetails(){
      try{
        const userData = await getUserByID(userId)
        setUser(userData)
      }catch(error){
        console.error(error);
      }
    }

    fetchUserDetails();
  },[userId])

  

  const payBill = async(e) =>{
    e.preventDefault()

    if(!payment){
      return toast.error("Pleace enter payment!")
    }

    if(payment<0){
      return toast.error("Pleace Enter valububle price")
    }

    await PayBill(payData)

    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Payment Succesfully. Thank you ! .',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        // navigate(`/pay-bill/${user._id}`)
        window.location.reload();
        
      }
    })


  }

  
    
  return (
    <div>
      
    {user ? (
      <div>
        <fieldset>
          <legend>Meter Owner's Details</legend>
          <p>Account ID: {user.AccountID}</p>
          <p>Name: {user.name}</p>
          <p>Full amount: {user.amount}</p>
          <p></p>

          <form onSubmit={payBill}>
            <input type='number' placeholder='Enter payment value' value={payment} onChange={(e)=>setPay(e.target.value)} required />
            <button type='submit'>Submit</button>
          </form>

        </fieldset>
          
         
      </div>
    ):(
      <p>Loading........</p>
    )}
    

  </div>
  )
}

export default Paybill