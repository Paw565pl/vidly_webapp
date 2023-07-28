import { Button } from "react-bootstrap";
import { Movie } from "../services/fakeMovieService";
import LikeButton from "./common/LikeButton";
import TableComponent from "./common/TableComponent";

interface Props {
  movies: Movie[];
  sorting: { value: string; order: "asc" | "dsc" };
  onSort: (sortValue: string) => void;
}

const MoviesTable = ({ movies, sorting, onSort }: Props) => {
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
    <TableComponent
      headers={headers}
      data={movies}
      sorting={sorting}
      onSort={(sortValue) => onSort(sortValue)}
    ></TableComponent>
  );
};

export default MoviesTable;
