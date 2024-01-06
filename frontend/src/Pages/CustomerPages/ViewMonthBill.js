// Import necessary modules
import React, { useEffect, useState } from 'react';
import { getLastMonthRecords, getUserByToken } from '../../services/customerServices';
import { Link } from 'react-router-dom';

// Define the ViewMonthBill component
const ViewMonthBill = () => {
  // State hooks for user and record data
  const [user, setUser] = useState(null);
  const [record, setRecord] = useState(null);

  // useEffect to fetch user and record data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user data
        const userData = await getUserByToken();
        setUser(userData);

        // Fetch last month records
        const recordData = await getLastMonthRecords();
        setRecord(recordData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  // Render the component
  return (
    <div>
      {user && record ? (
        <div>
          <p>Account ID: {user.AccountID}</p>
          <p>Amount: {user.amount}</p>
          <p>Last meter: {user.lastMeter}</p>
          {/* Access the properties of the first item in the record array */}
          <p>This month fee: {record[0].bill}</p>
          <p>Billed date: {new Date(record[0].date).toLocaleDateString()}</p>
          <br/>
          <br/>
          <br/>
          <button><Link to={`/pay-bill/${user._id}`}>Pay Now</Link></button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

// Export the component
export default ViewMonthBill;
