import React, { useEffect, useState } from 'react'
import { paymentHistory } from '../../services/PaymentService'
import CustomerNavBar from '../../Components/CustomerNavBar';

const PaymentHistory = () => {
    const [record,setRecord] = useState([])
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };

    useEffect(()=>{
        async function fetchRecord(){
            try{
                const data = await paymentHistory();
                console.log(data);
                setRecord(data)

            }catch(error){
                console.error('Error fetching records:', error);
            }
        }
        fetchRecord()
    },[])
  return (
    <div>
      <CustomerNavBar/>
        <div>
      {record && Array.isArray(record) ? (
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Full amount</th>
              <th>Payment</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {record.map((reco) => (
              <tr key={reco._id}>
                <td>{reco.transactionID}</td>
                <td>{new Date(reco.date).toLocaleDateString(undefined, dateOptions)} {new Date(reco.date).toLocaleTimeString(undefined, timeOptions)}</td>
                <td>{reco.lastAmount}</td>
                <td>{reco.payment}</td>
                <td>{reco.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>

    </div>
  )
}

export default PaymentHistory