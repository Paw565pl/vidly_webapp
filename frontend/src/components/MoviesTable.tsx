import { ReactNode } from "react";
import { Table } from "react-bootstrap";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { Movie } from "../services/fakeMovieService";
import createSlug from "../utils/createSlug";
import resolveObjectPath from "../utils/resolveObjectPath";

interface Header {
  value: string;
  label: ReactNode;
  content?: ReactNode;
}

interface Props {
  headers: Header[];
  movies: Movie[];
  sorting: { value: string; order: "asc" | "dsc" };
  onSort: (sortValue: string) => void;
}

const MoviesTable = ({ headers, movies, sorting, onSort }: Props) => {
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
    (resolveObjectPath(item, header.value) as ReactNode) || header.content;

  return (
    <Table striped>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th
              key={i}
              onClick={() => onSort(header.value)}
              style={header.label ? { cursor: "pointer" } : {}}
            >
              {header.label}
              {header.label && renderSortIcon(header)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {movies.map((_, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, itemIndex) => (
              <td key={itemIndex}>
                {header.value === "title" ? (
                  <Link to={`/movie/${createSlug(movies[rowIndex].title)}`}>
                    {renderCell(movies[rowIndex], header)}
                  </Link>
                ) : (
                  renderCell(movies[rowIndex], header)
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MoviesTable;
