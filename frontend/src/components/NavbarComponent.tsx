import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark" className="mb-5">
      <Container className="px-3">
        <Navbar.Brand className="me-1">
          <Link to={""}>Vidly</Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <NavLink to={"movies"} className={"nav-link"}>
            Movies
          </NavLink>
          <NavLink to={"customers"} className={"nav-link"}>
            Customers
          </NavLink>
          <NavLink to={"rentals"} className={"nav-link"}>
            Rentals
          </NavLink>
          <NavLink to={"login"} className={"nav-link"}>
            Login
          </NavLink>
          <NavLink to={"register"} className={"nav-link"}>
            Register
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
