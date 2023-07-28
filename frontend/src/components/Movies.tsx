import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useDeleteMovie from "../hooks/useDeleteMovie";
import useGenres from "../hooks/useGenres";
import useMovies from "../hooks/useMovies";
import paginate from "../utils/paginate";
import resolveObjectPath from "../utils/resolveObjectPath";
import MoviesHeading from "./MoviesHeading";
import MoviesTable from "./MoviesTable";
import Input from "./common/Input";
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
  const { data: fetchedMovies, isLoading } = useMovies();
  const { data: fetchedGenres } = useGenres();

  const { mutate: deleteMovieById, error: deleteError } = useDeleteMovie();

  const navigate = useNavigate();

  const [movieQuery, setMovieQuery] = useState<MovieQuery>({
    activePage: 1,
    searchInput: "",
    genreId: "",
    sortObject: { value: "title", order: "asc" },
  });

  if (isLoading) return <p>Loading...</p>;

  if (fetchedMovies?.length === 0)
    return <h6>There are no movies in the database.</h6>;

  const genres = [{ _id: "", name: "All genres" }, ...(fetchedGenres || [])];

  const pageSize = 4; // TODO: dropdown to pick page size

  const {
    activePage,
    searchInput,
    genreId,
    sortObject: { value: sortValue, order: sortOrder },
  } = movieQuery;

  const filteredMovies = searchInput
    ? fetchedMovies?.filter((movie) =>
        movie.title.toLowerCase().includes(searchInput.toLowerCase())
      )
    : genreId
    ? fetchedMovies?.filter((movie) => movie.genre._id === genreId)
    : fetchedMovies;

  const sortedMovies = sortValue
    ? filteredMovies?.sort((movieA, movieB) => {
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

  const paginatedMovies = paginate(sortedMovies || [], activePage, pageSize);

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
        <MoviesHeading moviesCount={sortedMovies?.length || 0}></MoviesHeading>
        <MoviesTable
          movies={paginatedMovies}
          sorting={{ value: sortValue, order: sortOrder }}
          onSort={(sortValue) => handleSort(sortValue)}
          onDelete={(movieId) => deleteMovieById(movieId)}
        ></MoviesTable>
        {deleteError && <p>{deleteError.message}</p>}
        {/* TODO: react toastify danger */}
        <PaginationComponent
          itemsCount={sortedMovies?.length || 0}
          pageSize={pageSize}
          activePage={activePage}
          onPageChange={handlePageChange}
        ></PaginationComponent>
      </Col>
    </Row>
  );
};

export default Movies;
