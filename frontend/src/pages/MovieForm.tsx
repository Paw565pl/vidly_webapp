import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import ToastComponent from "../components/common/ToastComponent";
import { MovieForm } from "../entities/Movie";
import useAddMovie from "../hooks/useAddMovie";
import useGenres from "../hooks/useGenres";
import useMovies from "../hooks/useMovies";
import useUpdateMovie from "../hooks/useUpdateMovie";
import MovieSchema from "../schemas/MovieSchema";
import createSlug from "../utils/createSlug";

const MovieForm = () => {
  const { data: movies } = useMovies();
  const { data: genres } = useGenres();

  const { mutate: addMovie, error: addingError } = useAddMovie();
  const { mutate: updateMovie, error: updatingError } = useUpdateMovie();

  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovieForm>({
    resolver: zodResolver(MovieSchema),
  });

  const currMovie = movies?.find((movie) => createSlug(movie.title) === slug);

  if (!currMovie && slug !== "new") throw new Error("Movie not found");

  const submitAction = (data: MovieForm) => {
    if (!currMovie) addMovie(data);
    else updateMovie({ itemId: currMovie._id, item: data });

    if (!addingError || !updatingError) navigate("/");
  };

  return (
    <div>
      {addingError && (
        <ToastComponent bg="danger">
          Oops. Something went wrong. Your movie was not added.
        </ToastComponent>
      )}

      <h1>Movie Form</h1>
      <Form onSubmit={handleSubmit(submitAction)}>
        <Input
          id="title"
          register={register("title")}
          defaultValue={currMovie?.title}
          errorMessage={errors?.title?.message}
        >
          Title
        </Input>
        <Select
          id="genre"
          options={genres || []}
          register={register("genreId")}
          defaultValue={currMovie?.genre._id}
          errorMessage={errors?.genreId?.message}
        >
          Genre
        </Select>
        <Input
          type="number"
          id="numberInStock"
          register={register("numberInStock", { valueAsNumber: true })}
          defaultValue={currMovie?.numberInStock}
          errorMessage={errors?.numberInStock?.message}
        >
          Number In Stock
        </Input>
        <Input
          type="number"
          id="rate"
          register={register("dailyRentalRate", { valueAsNumber: true })}
          defaultValue={currMovie?.dailyRentalRate}
          errorMessage={errors?.dailyRentalRate?.message}
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
