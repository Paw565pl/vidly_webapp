import { Container } from "react-bootstrap";
import Movies from "./components/Movies";

const App = () => {
  return (
    <Container>
      <h1>vidly</h1>
      <Movies></Movies>
    </Container>
  );
};

export default App;
