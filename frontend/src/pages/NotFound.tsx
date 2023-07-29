import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/"), 3000);
  }, []);

  return (
    <>
      <h1>
        Not Found <Spinner animation="border" variant="primary" />
      </h1>
      <p>Redirecting you back to the main page...</p>
    </>
  );
};

export default NotFound;
