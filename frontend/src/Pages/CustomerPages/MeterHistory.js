import React, { useEffect, useState } from 'react';
import { MeterRecordHistory } from '../../services/customerServices';

const MeterHistory = () => {
  const [record, setRecord] = useState([]);

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
                <td>{reco.date}</td>
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
