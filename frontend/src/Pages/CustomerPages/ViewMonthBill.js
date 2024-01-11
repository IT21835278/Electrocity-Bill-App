// Import necessary modules
import React, { useEffect, useState } from 'react';
import { getLastMonthRecords, getUserByToken } from '../../services/customerServices';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
    <Container className="mt-4">
      {user && record ? (
        <Card style={{alignItems:'center'}}>
          <Card.Body>
            <Card.Title style={{ fontSize: '24px', fontWeight: 'bold' }}>View Monthly Bill</Card.Title>
            <Card.Text>
              <p>Account ID: {user.AccountID}</p>
              <p>Amount: Rs.{user.amount}</p>
              <p>Last meter: {user.lastMeter}</p>
              {/* Access the properties of the first item in the record array */}
              <p>This month fee: Rs.{record[0].bill}</p>
              <p>Billed date: {new Date(record[0].date).toLocaleDateString()}</p>
            </Card.Text>
            <Link to={`/pay-bill/${user._id}`}>
              <Button variant="primary" style={{paddingLeft:'50px',paddingRight:'50px'}}>Pay Now</Button>
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

// Export the component
export default ViewMonthBill;
