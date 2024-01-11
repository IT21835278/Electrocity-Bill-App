import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const CustomerNavBar = () => {
  return (
    <Navbar bg="info"  >
      <Navbar.Brand href="#">Home</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/view-bill" className="ml-4">
          Bill Pay
        </Nav.Link>
        <Nav.Link as={Link} to="/meter-history" className="ml-4">
          Bill History
        </Nav.Link>
        <Nav.Link as={Link} to="/payment-history" className="ml-4">
          Payment History
        </Nav.Link>
        <Nav.Link as={Link} to="/view-unit-rate" className="ml-4">
          Unit rate
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default CustomerNavBar;
