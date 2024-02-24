import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/Navbar";

const Layout = () => {
  return (
    <>
      <NavbarComponent />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
