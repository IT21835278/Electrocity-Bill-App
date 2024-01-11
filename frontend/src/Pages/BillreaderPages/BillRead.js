import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CalBill, getUserByID } from '../../services/meterReadService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const BillRead = () => {
  const { userId } = useParams();
  const [user, setUsers] = useState(null);
  const [meterRead, setMeterRead] = useState(0);

  const navigate = useNavigate();

  const meterData = {
    meterRead,
    AccountID: user ? user.AccountID : null,
  };

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const userData = await getUserByID(userId);
        setUsers(userData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserDetails();
  }, [userId]);

  const newReading = async (e) => {
    e.preventDefault();

    if (user.lastMeter > meterRead) {
      return toast.error('Please enter a correct Meter reading');
    }

    await CalBill(meterData);

    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'New meter reading entered successfully.',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/Select-reding');
      }
    });
  };

  return (
    <div className="container mt-4 bg-light ml-4"  style={{paddingTop:'30px', paddingLeft:'40px', paddingRight:'40px', border: '1px solid #000'}}>
      {user ? (
        <div style={{paddingTop:'30px', paddingLeft:'40px', paddingRight:'40px', paddingBottom:'30px'}}>
          <fieldset >
            <legend>Meter Owner's Details</legend>
            <p style={{paddingLeft:'50px'}}>Account ID: {user.AccountID}</p>
            <p style={{paddingLeft:'50px'}}>Name: {user.name}</p>
            <p style={{paddingLeft:'50px'}}>Address: {user.Address}</p>
            <p style={{paddingLeft:'50px'}}>Previous meter: {user.lastMeter}</p>

            <Form onSubmit={newReading}>
              <Form.Group controlId="newMeterReading" style={{paddingLeft:'50px'}}>
                <Form.Label><b>New Meter Reading</b></Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter new meter reading"
                  value={meterRead}
                  onChange={(e) => setMeterRead(e.target.value)}
                  required
                  
                />
              </Form.Group >
              <Button style={{ marginTop: '30px', marginLeft: 'auto', display: 'block', paddingLeft: '40px', paddingRight: '40px' }} variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </fieldset>
        </div>
      ) : (
        <p>Loading........</p>
      )}
    </div>
  );
};

export default BillRead;
