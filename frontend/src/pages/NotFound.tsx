import { useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const navigateToMainPage = () => navigate("/movies");

  useEffect(() => {
    setTimeout(navigateToMainPage, 5000);
  }, []);

  return (
    <>
      <div className="d-flex align-items-center gap-2">
        <h1>Page Not Found</h1>
        <Spinner animation="border" variant="primary" />
      </div>
      <p>Redirecting you back to the main page...</p>
      <Button variant="primary" onClick={navigateToMainPage}>
        Redirect now
      </Button>
    </>
  );
};

export default NotFound;
