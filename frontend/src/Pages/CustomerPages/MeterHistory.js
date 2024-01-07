import React, { useEffect, useState } from 'react';
import { MeterRecordHistory } from '../../services/customerServices';
import CustomerNavBar from '../../Components/CustomerNavBar';

const MeterHistory = () => {
  const [record, setRecord] = useState([]);

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit' };

  useEffect(() => {
    async function fetchRecord() {
      try {
        const data = await MeterRecordHistory();
        console.log('API Response:', data);
        setRecord(data);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    }

    fetchRecord();
  }, []);

  return (
    <div>
      <CustomerNavBar/>
      {record && Array.isArray(record) ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Meter Reading</th>
              <th>Monthly Payment</th>
            </tr>
          </thead>
          <tbody>
            {record.map((reco) => (
              <tr key={reco._id}>
                <td>{new Date(reco.date).toLocaleDateString(undefined, dateOptions)} </td>
                {/* time-{new Date(reco.date).toLocaleTimeString(undefined, timeOptions)} */}
                <td>{reco.meterRead}</td>
                <td>{reco.bill}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MeterHistory;
