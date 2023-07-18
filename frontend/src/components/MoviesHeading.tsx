interface Props {
  moviesCount: number;
}

const MoviesHeading = ({ moviesCount }: Props) => {
  return <h6>Showing {moviesCount} movies in the database.</h6>;
};

export default MoviesHeading;
