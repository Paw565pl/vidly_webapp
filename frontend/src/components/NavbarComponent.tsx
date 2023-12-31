import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";

const NavbarComponent = () => {
  const { getUser } = useCurrentUser();
  const loggedUser = getUser();

  return (
    <Navbar bg="primary" data-bs-theme="dark" className="mb-5">
      <Container className="px-3">
        <Navbar.Brand>
          <Link to={""}>Vidly</Link>
        </Navbar.Brand>
        <Nav className="w-100 d-flex justify-content-between">
          <div className="d-flex">
            <NavLink to={"movies"} className={"nav-link"}>
              Movies
            </NavLink>
            <NavLink to={"customers"} className={"nav-link"}>
              Customers
            </NavLink>
            <NavLink to={"rentals"} className={"nav-link"}>
              Rentals
            </NavLink>
          </div>
          <div className="d-flex">
            {loggedUser ? (
              <>
                <NavLink to={"profile"} className={"nav-link"}>
                  {loggedUser.name}
                </NavLink>
                <Link to={"logout"} className={"nav-link"}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <NavLink to={"login"} className={"nav-link"}>
                  Login
                </NavLink>
                <NavLink to={"register"} className={"nav-link"}>
                  Register
                </NavLink>
              </>
            )}
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
