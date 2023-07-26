import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginForm = () => {
  return (
    <div>
      <h1>Login</h1>
      <Form>
        <Form.Group className="mb-3" controlId="loginUserName">
          <Form.Label>Username</Form.Label>
          <Form.Control autoFocus type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
