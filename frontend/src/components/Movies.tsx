import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useGenres from "../hooks/useGenres";
import { getMovies } from "../services/fakeMovieService";
import paginate from "../utils/paginate";
import resolveObjectPath from "../utils/resolveObjectPath";
import MoviesHeading from "./MoviesHeading";
import MoviesTable from "./MoviesTable";
import Input from "./common/Input";
import LikeButton from "./common/LikeButton";
import ListGroupComponent from "./common/ListGroupComponent";
import PaginationComponent from "./common/PaginationComponent";

interface SortObject {
  value: string;
  order: "asc" | "dsc";
}

interface MovieQuery {
  activePage: number;
  searchInput: string;
  genreId: string;
  sortObject: SortObject;
}

const Movies = () => {
  const allMovies = getMovies();
  const { data: fetchedGenres } = useGenres();

  if (allMovies.length === 0)
    return <h6>There are no movies in the database.</h6>;

  const navigate = useNavigate();

  const genres = [{ _id: "", name: "All genres" }, ...(fetchedGenres || [])];

  const pageSize = 4; // TODO: dropdown to pick page size

  const [movieQuery, setMovieQuery] = useState<MovieQuery>({
    activePage: 1,
    searchInput: "",
    genreId: "",
    sortObject: { value: "title", order: "asc" },
  });

  const {
    activePage,
    searchInput,
    genreId,
    sortObject: { value: sortValue, order: sortOrder },
  } = movieQuery;

  const filteredMovies = searchInput
    ? allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchInput.toLowerCase())
      )
    : genreId
    ? allMovies.filter((movie) => movie.genre._id === genreId)
    : allMovies;

  const sortedMovies = sortValue
    ? filteredMovies.sort((movieA, movieB) => {
        const sortNumber = sortOrder === "asc" ? 1 : -1;

        return resolveObjectPath(movieA, sortValue) <
          resolveObjectPath(movieB, sortValue)
          ? -sortNumber
          : sortNumber;
      })
    : filteredMovies;

  const handlePageChange = (page: number) =>
    setMovieQuery({ ...movieQuery, activePage: page });

  const handleGenreSelect = (genreId: string) =>
    setMovieQuery({ ...movieQuery, activePage: 1, genreId });

  const handleSearch = (searchInput: string) =>
    setMovieQuery({ ...movieQuery, activePage: 1, genreId: "", searchInput });

  const handleSort = (newSortValue: string) => {
    const sortObject: SortObject =
      newSortValue === sortValue
        ? sortOrder === "asc"
          ? { value: newSortValue, order: "dsc" }
          : { value: newSortValue, order: "asc" }
        : { value: newSortValue, order: sortOrder };

    setMovieQuery({
      ...movieQuery,
      sortObject,
    });
  };

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

  const paginatedMovies = paginate(sortedMovies, activePage, pageSize);

  return (
    <Row>
      <Col xs={12} md={3}>
        <ListGroupComponent
          items={genres}
          selectedItemId={genreId}
          onItemSelect={handleGenreSelect}
        ></ListGroupComponent>
      </Col>
      <Col>
        <Button variant="primary" onClick={() => navigate("/movie/new")}>
          New Movie
        </Button>
        <Input
          id="movieSearch"
          placeholder="Search..."
          onChange={(value) => handleSearch(value)}
        ></Input>
        <MoviesHeading moviesCount={sortedMovies.length}></MoviesHeading>
        <MoviesTable
          headers={headers}
          movies={paginatedMovies}
          sorting={{ value: sortValue, order: sortOrder }}
          onSort={(sortValue) => handleSort(sortValue)}
        ></MoviesTable>
        <PaginationComponent
          itemsCount={sortedMovies.length}
          pageSize={pageSize}
          activePage={activePage}
          onPageChange={handlePageChange}
        ></PaginationComponent>
      </Col>
    </Row>
  );
};

export default Movies;
