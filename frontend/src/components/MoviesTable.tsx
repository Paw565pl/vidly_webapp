import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Movie } from "../services/fakeMovieService";
import LikeButton from "./common/LikeButton";
import TableComponent from "./common/TableComponent";

interface Props {
  movies: Movie[];
}

const MoviesTable = ({ movies }: Props) => {
  const headers = [
    { value: "title", label: "Title" },
    { value: "genre.name", label: "Genre" },
    { value: "numberInStock", label: "Stock" },
    { value: "dailyRentalRate", label: "Rate" },
    { value: "", label: "", content: <LikeButton /> },
    {
      value: "",
      label: "",
      content: <Button variant={"danger"}>Delete</Button>,
    },
  ];

  const data = movies.map((movie) => {
    return {
      ...movie,
      title: <Link to={`/movie/${movie._id}`}>{movie.title}</Link>,
    };
  });

  return <TableComponent headers={headers} data={data}></TableComponent>;
};

export default MoviesTable;
