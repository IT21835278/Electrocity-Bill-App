import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CalBill, getUserByID } from '../../services/meterReadService'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2';

const BillRead = () => {
  const {userId} = useParams()
  const [user, setUsers]=useState(null)
  const [meterRead, setMeterRead] = useState(0)

  const navigate = useNavigate()

  const meterData = {
    meterRead,
    AccountID: user ? user.AccountID : null,
  };

  useEffect(()=>{
    async function fetchUserDetails(){
      try{
        const userData = await getUserByID(userId)
        setUsers(userData)
      }catch(error){
        console.error(error);
      }
    }

    fetchUserDetails();
  },[userId])


  const newReading = async(e) =>{
    e.preventDefault()

  
    if(user.lastMeter>meterRead){
      return toast.error("Pleace enter Correct Meter reading")
    }

    await CalBill(meterData)

    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'New meter reading entered successfully.',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/Select-reding")
        
      }
    });

  }


  return (
    <div>
      {user ? (
        <div>
          <fieldset>
            <legend>Meter Owner's Details</legend>
            <p>Account ID: {user.AccountID}</p>
            <p>Name: {user.name}</p>
            <p>Address: {user.Address}</p>
            <p>Previous meter: {user.lastMeter}</p>

            <form onSubmit={newReading}>
              <input type='number' placeholder='New Meater Reading' value={meterRead} onChange={(e)=>setMeterRead(e.target.value)} required />
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

export default BillRead