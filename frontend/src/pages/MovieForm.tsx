import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import ToastComponent from "../components/common/ToastComponent";
import useAddMovie from "../hooks/useAddMovie";
import useGenres from "../hooks/useGenres";
import useMovies from "../hooks/useMovies";
import useUpdateMovie from "../hooks/useUpdateMovie";
import MovieSchema, { MovieFormValues } from "../schemas/MovieSchema";
import createSlug from "../utils/createSlug";

const MovieForm = () => {
  const { data: movies } = useMovies();
  const { data: genres } = useGenres();

  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors: validationErrors, isSubmitted },
  } = useForm<MovieFormValues>({
    resolver: zodResolver(MovieSchema),
  });

  const { mutate: addMovie, error: addingError } = useAddMovie();
  const { mutate: updateMovie, error: updatingError } = useUpdateMovie();

  const submitAction = (data: MovieFormValues) => {
    if (!currMovie) addMovie(data, { onSuccess: navigateToMovies });
    else
      updateMovie(
        { itemId: currMovie._id, item: data },
        { onSuccess: navigateToMovies },
      );
  };

  const navigateToMovies = () => navigate("/");

  const currMovie = movies?.find((movie) => createSlug(movie.title) === slug);

  if (!isSubmitted && !currMovie && slug !== "new")
    throw new Error("Movie not found");

  return (
    <div>
      {(addingError || updatingError) && (
        <ToastComponent bg="danger">
          {addingError?.response?.status === 401 ||
          updatingError?.response?.status === 401
            ? "You have to be logged in!"
            : "Oops. Something went wrong. Your movie was not added."}
        </ToastComponent>
      )}

      <h1>Movie Form</h1>
      <Form onSubmit={handleSubmit(submitAction)}>
        <Input
          id="title"
          register={register("title")}
          defaultValue={currMovie?.title}
          errorMessage={validationErrors?.title?.message}
        >
          Title
        </Input>
        <Select
          id="genre"
          options={genres || []}
          register={register("genreId")}
          defaultValue={currMovie?.genre._id}
          errorMessage={validationErrors?.genreId?.message}
        >
          Genre
        </Select>
        <Input
          type="number"
          id="numberInStock"
          register={register("numberInStock", { valueAsNumber: true })}
          defaultValue={currMovie?.numberInStock}
          errorMessage={validationErrors?.numberInStock?.message}
        >
          Number In Stock
        </Input>
        <Input
          type="number"
          id="rate"
          register={register("dailyRentalRate", { valueAsNumber: true })}
          defaultValue={currMovie?.dailyRentalRate}
          errorMessage={validationErrors?.dailyRentalRate?.message}
        >
          Rate
        </Input>
        <Button type="submit" variant="primary">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default MovieForm;
