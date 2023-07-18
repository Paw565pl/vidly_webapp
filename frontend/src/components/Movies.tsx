import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import paginate from "../utils/paginate";
import resolveObjectPath from "../utils/resolveObjectPath";
import ListGroupComponent from "./ListGroupComponent";
import MoviesHeading from "./MoviesHeading";
import MoviesTable from "./MoviesTable";
import PaginationComponent from "./PaginationComponent";

const Movies = () => {
  const allMovies = getMovies();
  const genres = [{ _id: "", name: "All genres" }, ...getGenres()];

  const pageSize = 4;

  const [activePage, setActivePage] = useState(1);
  const [selectedGenreId, setSelectedGenreId] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const filteredMovies = selectedGenreId
    ? allMovies.filter((movie) => movie.genre._id === selectedGenreId)
    : allMovies;

  const sortedMovies = filteredMovies.sort((movieA, movieB) =>
    resolveObjectPath(movieA, sortOrder) < resolveObjectPath(movieB, sortOrder)
      ? -1
      : 1
  );

  const paginatedMovies = paginate(sortedMovies, activePage, pageSize);

  const handleDelete = (idMovie: string) =>
    // TODO: to impelement
    console.log(idMovie);

  const handlePageChange = (page: number) => setActivePage(page);

  const handleGenreSelect = (genreId: string) => {
    setActivePage(1);
    setSelectedGenreId(genreId);
  };

  const handleSort = (sortValue: string) => setSortOrder(sortValue);

  if (sortedMovies.length === 0)
    return <h6>There are no movies in the database.</h6>;

  return (
    <Row>
      <Col xs={12} md={3}>
        <ListGroupComponent
          items={genres}
          selectedItemId={selectedGenreId}
          onItemSelect={handleGenreSelect}
        ></ListGroupComponent>
      </Col>
      <Col>
        <MoviesHeading moviesCount={sortedMovies.length}></MoviesHeading>
        <MoviesTable
          movies={paginatedMovies}
          onSort={handleSort}
          onDelete={handleDelete}
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
