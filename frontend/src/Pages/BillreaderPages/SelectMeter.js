import React, { useEffect, useState } from 'react';
import { getAllUser } from '../../services/meterReadService';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const SelectMeter = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUserData() {
      try {
        const data = await getAllUser();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    getUserData();
  }, []);

  return (
    <div style={{ paddingTop:'50px', paddingLeft:'40px', paddingRight:'40px' }}>
      {users ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Account ID</th>
              <th>Address</th>
              <th>Previous Reading</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.AccountID}</td>
                <td>{user.Address}</td>
                <td>{user.lastMeter}</td>
                <td>
                  <Link to={`/reading-meter/${user._id}`}>Click</Link>
                </td>
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

export default SelectMeter;
