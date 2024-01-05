import React, { useEffect, useState } from 'react';
import { getAllUser } from '../../services/meterReadService';
import { Link } from 'react-router-dom';
import { Logout } from '../../services/authService';

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
    <div>
      <button onClick={Logout} className="--btn--btn-danger">Log out</button>
      {users ? (
        <table>
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
                  <Link to={`/reading-meter/${user._id}`}>click</Link>
                </td>
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

export default SelectMeter;
