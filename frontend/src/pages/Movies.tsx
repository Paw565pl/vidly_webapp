import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MoviesHeading from "../components/MoviesHeading";
import MoviesTable from "../components/MoviesTable";
import Input from "../components/common/Input";
import ListGroupComponent from "../components/common/ListGroupComponent";
import PaginationComponent from "../components/common/PaginationComponent";
import ToastComponent from "../components/common/ToastComponent";
import useDeleteMovie from "../hooks/useDeleteMovie";
import useGenres from "../hooks/useGenres";
import useMovies from "../hooks/useMovies";
import paginate from "../utils/paginate";
import resolveObjectPath from "../utils/resolveObjectPath";

interface SortObject {
  value: string;
  order: "asc" | "dsc";
}

interface MovieQuery {
  activePage: number;
  searchInput: string;
  selectedGenreId: string;
  sortObject: SortObject;
}

const Movies = () => {
  const { data: movies, isLoading, error: fetchingMoviesError } = useMovies();
  const { data: genres, error: fetchingGenresError } = useGenres();
  const { mutate: deleteMovie, error: deleteMovieError } = useDeleteMovie();

  const navigate = useNavigate();

  const [movieQuery, setMovieQuery] = useState<MovieQuery>({
    activePage: 1,
    searchInput: "",
    selectedGenreId: "",
    sortObject: { value: "title", order: "asc" },
  });
  const {
    activePage,
    searchInput,
    selectedGenreId,
    sortObject: { value: sortValue, order: sortOrder },
  } = movieQuery;

  if (fetchingMoviesError || fetchingGenresError)
    throw new Error("fetching error");

  if (isLoading) return <p>Loading...</p>;

  const selectGenresItems = [
    { _id: "", name: "All genres" },
    ...(genres || []),
  ];
  const pageSize = 4;

  const filteredMovies = searchInput
    ? movies?.filter((movie) =>
        movie.title.toLowerCase().includes(searchInput.toLowerCase()),
      )
    : selectedGenreId
      ? movies?.filter((movie) => movie.genre._id === selectedGenreId)
      : movies;

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
    setMovieQuery((previousMovieQuery) => ({
      ...previousMovieQuery,
      activePage: page,
    }));

  const handleGenreSelect = (selectedGenreId: string) =>
    setMovieQuery((previousMovieQuery) => ({
      ...previousMovieQuery,
      activePage: 1,
      selectedGenreId,
    }));

  const handleSearch = (searchInput: string) =>
    setMovieQuery((previousMovieQuery) => ({
      ...previousMovieQuery,
      activePage: 1,
      selectedGenreId: "",
      searchInput,
    }));

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
      {deleteMovieError && (
        <ToastComponent bg="danger">
          {deleteMovieError?.response?.status === 401
            ? "You have to be logged in!"
            : "Oops. Something went wrong."}
        </ToastComponent>
      )}
      <Col xs={12} md={3}>
        <ListGroupComponent
          items={selectGenresItems}
          selectedItemId={selectedGenreId}
          onItemSelect={handleGenreSelect}
        />
      </Col>
      <Col>
        <Button
          className="mt-2 mt-md-0"
          variant="primary"
          onClick={() => navigate("/movies/new")}
        >
          New Movie
        </Button>
        <Input
          id="movieSearch"
          placeholder="Search here"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <MoviesHeading moviesCount={sortedMovies?.length || 0} />
        <MoviesTable
          movies={paginatedMovies}
          sorting={{ value: sortValue, order: sortOrder }}
          onSort={(sortValue) => handleSort(sortValue)}
          onDelete={(movieId) => deleteMovie(movieId)}
        />
        <PaginationComponent
          itemsCount={sortedMovies?.length || 0}
          pageSize={pageSize}
          activePage={activePage}
          onPageChange={handlePageChange}
        />
      </Col>
    </Row>
  );
};

export default Movies;
