import { Button, Table } from "react-bootstrap";
import { Movie } from "../services/fakeMovieService";
import LikeButton from "./LikeButton";

interface Props {
  movies: Movie[];
  onSort: (sortValue: string) => void;
  onDelete: (movieId: string) => void;
}

const MoviesTable = ({ movies, onSort, onDelete }: Props) => {
  return (
    <Table>
      <thead>
        <tr>
          <th onClick={() => onSort("title")}>Title</th>
          <th onClick={() => onSort("genre.name")}>Genre</th>
          <th onClick={() => onSort("numberInStock")}>Stock</th>
          <th onClick={() => onSort("dailyRentalRate")}>Rate</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie, i) => (
          <tr key={i}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <LikeButton></LikeButton>
            </td>
            <td>
              <Button variant={"danger"} onClick={() => onDelete(movie._id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MoviesTable;
