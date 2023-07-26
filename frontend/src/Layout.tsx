import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";

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
