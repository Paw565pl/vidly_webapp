import { ReactNode } from "react";
import { Button, Table } from "react-bootstrap";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import Movie from "../entities/Movie";
import createSlug from "../utils/createSlug";
import resolveObjectPath from "../utils/resolveObjectPath";

interface Header {
  value: string;
  label: ReactNode;
}

interface Props {
  movies: Movie[];
  sorting: { value: string; order: "asc" | "dsc" };
  onSort: (sortValue: string) => void;
  onDelete: (movieId: string) => void;
}

const MoviesTable = ({ movies, sorting, onSort, onDelete }: Props) => {
  const headers = [
    { value: "title", label: "Title" },
    { value: "genre.name", label: "Genre" },
    { value: "numberInStock", label: "Stock" },
    { value: "dailyRentalRate", label: "Rate" }
  ];

  const renderSortIcon = (header: Header) => {
    if (sorting.value !== header.value) return null;

    switch (sorting.order) {
      case "asc":
        return <AiOutlineSortAscending />;

      case "dsc":
        return <AiOutlineSortDescending />;

      default:
        return null;
    }
  };

  const renderCell = (item: Movie, header: Header) =>
    resolveObjectPath(item, header.value) as ReactNode;
    
  return (
    <Table striped>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th
              key={i}
              onClick={() => onSort(header.value)}
              style={header.label ? { cursor: "pointer" } : {}}
            >1
              {header.label}
              {header.label && renderSortIcon(header)}
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {movies.map((_, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, itemIndex) => (
              <td key={itemIndex}>
                {header.value === "title" ? (
                  <Link to={`/movies/${createSlug(movies[rowIndex].title)}`}>
                    {renderCell(movies[rowIndex], header)}
                  </Link>
                ) : (
                  renderCell(movies[rowIndex], header)
                )}
              </td>
            ))}
            <td>
              <Button
                variant={"danger"}
                size="sm"
                onClick={() => onDelete(movies[rowIndex]._id)}
              >
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
