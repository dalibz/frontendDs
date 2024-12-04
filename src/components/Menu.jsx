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
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Gestion Commerciale</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/categories">Catégories</Nav.Link>
          <Nav.Link as={Link} to="/scategories">Sous Catégories</Nav.Link>
          <Nav.Link as={Link} to="/articles">Liste des Articles</Nav.Link>
        </Nav>
      </Container>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="success" onClick={handleSearch}>Chercher</Button>
      </Form>
    </Navbar>
  );
};

export default Menu;
