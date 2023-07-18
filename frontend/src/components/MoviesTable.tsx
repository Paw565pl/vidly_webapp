import { Button } from "react-bootstrap";
import { Movie } from "../services/fakeMovieService";
import LikeButton from "./common/LikeButton";
import TableComponent, { Item } from "./common/TableComponent";

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

  return (
    <TableComponent headers={headers} data={movies as Item[]}></TableComponent>
  );
};

export default MoviesTable;
