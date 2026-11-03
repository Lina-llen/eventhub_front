import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="fw-bold">
                    Events App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/events" className={({ isActive }) => isActive ? 'active text-white' : 'text-light'}>
                            Events
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/login" className={({ isActive }) => isActive ? 'active text-white' : 'text-light'}>
                            Connexion
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/register" className={({ isActive }) => isActive ? 'active text-white' : 'text-light'}>
                            Inscription
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;