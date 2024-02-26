import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserByID } from '../../services/meterReadService';
import { toast } from 'react-toastify';
import { PayBill } from '../../services/PaymentService';
import Swal from 'sweetalert2';
import CustomerNavBar from '../../Components/NavBar/CustomerNavBar';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Paybill = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [payment, setPay] = useState(0);

  const payData = {
    payment,
    _id: user ? user._id : null,
  };

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const userData = await getUserByID(userId);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserDetails();
  }, [userId]);

  const payBill = async (e) => {
    e.preventDefault();

    if (!payment) {
      return toast.error('Please enter payment!');
    }

    if (payment < 0) {
      return toast.error('Please enter a valid payment amount');
    }

    await PayBill(payData);

    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Payment successfully received. Thank you!',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body className='bg-light'>
          {user ? (
            <div>
              <Card.Title className="mb-4">Meter Owner's Details</Card.Title>
              <Card.Text style={{paddingLeft:'50px'}}>
                <p><b>Account ID:</b> {user.AccountID}</p>
                <p><b>Name:</b> {user.name}</p>
                <p><b>Full amount:</b> {user.amount}</p>
              </Card.Text>

              <Form onSubmit={payBill} style={{paddingLeft:'50px'}}>
                <Form.Group controlId="paymentValue">
                  <Form.Label><b>Enter payment value</b></Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter payment value"
                    value={payment}
                    style={{width:'200px'}}
                    onChange={(e) => setPay(e.target.value)}
                    min={0}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ marginTop: '30px', marginLeft: 'auto', display: 'block', paddingLeft: '40px', paddingRight: '40px' }}>Submit</Button>
              </Form>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Paybill;
