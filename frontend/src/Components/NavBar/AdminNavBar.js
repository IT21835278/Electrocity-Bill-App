import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const AdminNavBar = () => {
  return (
    <Navbar bg="info"  >
      <Navbar.Brand href="#"></Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/Select-reding" className="ml-4">
          Bill Read
        </Nav.Link>
        <Nav.Link as={Link} to="/Update-unit-prices" className="ml-4">
          Update Unit-rate
        </Nav.Link>
        <Nav.Link as={Link} to="/view-unit-rate" className="ml-4">
          Unit rate
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default AdminNavBar;
