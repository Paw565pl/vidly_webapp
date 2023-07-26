import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Movie Form id: {id}</h1>
      <Button variant="primary" onClick={() => navigate("/")}>
        Save
      </Button>
    </div>
  );
};

export default MovieForm;
