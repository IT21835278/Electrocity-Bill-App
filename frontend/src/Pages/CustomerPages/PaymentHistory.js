import React, { useEffect, useState } from 'react';
import { paymentHistory } from '../../services/PaymentService';
import CustomerNavBar from '../../Components/NavBar/CustomerNavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PaymentHistory = () => {
  const [record, setRecord] = useState([]);
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit' };

  useEffect(() => {
    async function fetchRecord() {
      try {
        const data = await paymentHistory();
        console.log(data);
        setRecord(data);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    }
    fetchRecord();
  }, []);

  return (
    <Container className="mt-4">
      <div className="border rounded" style={{padding:'20px'}}>
        <Row className="mb-4 text-black bg-info" style={{  fontWeight: 'bold' }}>
          <Col md={4}>Transaction ID</Col>
          <Col md={2}>Date & Time</Col>
          <Col md={2}>Full amount</Col>
          <Col md={2}>Payment</Col>
          <Col md={2}>Amount</Col>
        </Row>
        {record && Array.isArray(record) ? (
          <div>
            {record.map((reco) => (
              <Row key={reco._id} className="mb-3 justify-content-between g-3 my-3">
                <Col md={4}>{reco.transactionID}</Col>
                <Col md={2}>{new Date(reco.date).toLocaleDateString(undefined, dateOptions)} {new Date(reco.date).toLocaleTimeString(undefined, timeOptions)}</Col>
                <Col md={2}>Rs.{reco.lastAmount}</Col>
                <Col md={2}>Rs.{reco.payment}</Col>
                <Col md={2}>Rs.{reco.amount}</Col>
              </Row>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Container>
  );
};

export default PaymentHistory;
