import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Container>
      <h1>vidly</h1>
      <Outlet />
    </Container>
  );
};

export default Layout;
