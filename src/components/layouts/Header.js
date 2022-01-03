import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Container, Nav} from 'react-bootstrap';

const Header = () => {
  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">
                <Link to="/categories" >Categories</Link>
              </Nav.Link>
              <Nav.Link href="#link">
                <Link to="/products">Products</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header;