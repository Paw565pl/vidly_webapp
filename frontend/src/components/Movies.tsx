import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import paginate from "../utils/paginate";
import MoviesHeading from "./MoviesHeading";
import MoviesTable from "./MoviesTable";
import Input from "./common/Input";
import ListGroupComponent from "./common/ListGroupComponent";
import PaginationComponent from "./common/PaginationComponent";

const Movies = () => {
  const navigate = useNavigate();

  const allMovies = getMovies();
  const genres = [{ _id: "", name: "All genres" }, ...getGenres()];

  const pageSize = 4;

  const [activePage, setActivePage] = useState(1);
  const [selectedGenreId, setSelectedGenreId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovies = searchQuery
    ? allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedGenreId
    ? allMovies.filter((movie) => movie.genre._id === selectedGenreId)
    : allMovies;

  const handlePageChange = (page: number) => setActivePage(page);

  const handleGenreSelect = (genreId: string) => {
    setActivePage(1);
    setSelectedGenreId(genreId);
  };

  const handleSearch = (input: string) => {
    setActivePage(1);
    setSelectedGenreId("");
    setSearchQuery(input);
  };

  if (filteredMovies.length === 0)
    return <h6>There are no movies in the database.</h6>;

  const paginatedMovies = paginate(filteredMovies, activePage, pageSize);

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
        <Button variant="primary" onClick={() => navigate("/movie/new")}>
          New Movie
        </Button>
        <Input
          id="movieSearch"
          placeholder="Search..."
          onChange={(value) => handleSearch(value)}
        ></Input>
        <MoviesHeading moviesCount={filteredMovies.length}></MoviesHeading>
        <MoviesTable movies={paginatedMovies}></MoviesTable>
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
