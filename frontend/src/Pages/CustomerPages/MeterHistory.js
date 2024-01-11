import React, { useEffect, useState } from 'react';
import { MeterRecordHistory } from '../../services/customerServices';
import Table from 'react-bootstrap/Table';

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
    <div style={{ paddingTop:'50px', paddingLeft:'40px', paddingRight:'40px' }}>
      {record && Array.isArray(record) ? (
        <Table bordered hover responsive variant="info">
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
                <td>{new Date(reco.date).toLocaleDateString(undefined, dateOptions)}</td>
                <td className='text-end'>{reco.meterRead}</td>
                <td className='text-end'>Rs.{reco.bill}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MeterHistory;
