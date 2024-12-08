import React from 'react';
import { Nav, Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // You can add routing or a function to handle the search logic
  };

  return (
    <Navbar bg="#d1b07d" variant="dark" className="menu-button">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Accueil
        </Navbar.Brand>
        <Nav className="menu-button">
          <Nav.Link as={Link} to="/categories">
            Catégories
          </Nav.Link>
          <Nav.Link as={Link} to="/scategories">
            Sous Catégories
          </Nav.Link>
          <Nav.Link as={Link} to="/articles">
            Liste des Articles
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Menu;
