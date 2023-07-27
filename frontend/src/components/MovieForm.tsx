import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getMovies } from "../services/fakeMovieService";

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const currMovie = getMovies().find((movie) => movie._id === id);

  if (!currMovie && id !== "new") throw new Error("Movie not found");

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
