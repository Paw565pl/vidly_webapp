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
  const pageSize = 4;
  const [activePage, setActivePage] = useState(1);

  const allMovies = getMovies();
  const [movies, setMovies] = useState(
    paginate(allMovies, activePage, pageSize)
  );

  const genres = [{ _id: "", name: "All genres" }, ...getGenres()];
  const [selectedGenreId, setSelectedGenreId] = useState("");

  const filteredMovies = selectedGenreId
    ? allMovies.filter((movie) => movie.genre._id === selectedGenreId)
    : allMovies;

  const handleDelete = (idMovie: string) =>
    setMovies((prevMovies) => prevMovies.filter((m) => m._id !== idMovie));

  const handlePageChange = (page: number) => {
    setActivePage(page);
    setMovies(paginate(filteredMovies, page, pageSize));
  };

  const handleGenreSelect = (genreId: string) => {
    setActivePage(1);
    setSelectedGenreId(genreId);
    genreId
      ? setMovies(
          paginate(
            allMovies.filter((movie) => movie.genre._id === genreId),
            1,
            pageSize
          )
        )
      : setMovies(paginate(allMovies, 1, pageSize));
  };

  const handleSort = (sortValue: string) => {
    const sortedMovies = filteredMovies.sort((movieA, movieB) =>
      resolveObjectPath(movieA, sortValue) <
      resolveObjectPath(movieB, sortValue)
        ? -1
        : 1
    );
    setMovies(paginate(sortedMovies, activePage, pageSize));
  };

  if (movies.length === 0) return <h6>There are no movies in the database.</h6>;

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
        <MoviesHeading moviesCount={filteredMovies.length}></MoviesHeading>
        <MoviesTable
          movies={movies}
          onSort={handleSort}
          onDelete={handleDelete}
        ></MoviesTable>
        <PaginationComponent
          itemsCount={filteredMovies.length}
          pageSize={pageSize}
          activePage={activePage}
          onPageChange={handlePageChange}
        ></PaginationComponent>
      </Col>
    </Row>
  );
};

export default Movies;
