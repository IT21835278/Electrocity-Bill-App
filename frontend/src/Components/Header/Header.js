import React from 'react';
import logoImg from '../../asserts/logoIMG.png'; // Corrected typo in the import
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { Logout } from '../../services/authService';

const Header = () => {
  return (
    <Container fluid >
      <Row className="header-row bg-light "  style={{paddingTop:'10px', backgroundColor: '#EEF5FA'}}>
        <Col className="logo-col">
          <Image src={logoImg} rounded className="logo-img" style={{ width: '120px', height: '120px' }}/>
        </Col>
        <Col className="title-col" style={{paddingTop:'30px'}}>
          <h1><b>Electricity Board</b></h1>
        </Col>
        <Col className="logout-col" style={{ textAlign: 'right', paddingTop:'40px'}}>
          <Button variant="danger" onClick={Logout}>
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
