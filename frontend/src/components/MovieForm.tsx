import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import MovieSchema from "../schemas/MovieSchema";
import { getGenres } from "../services/fakeGenreService";
import { Movie, getMovies, saveMovie } from "../services/fakeMovieService";
import Input from "./common/Input";
import Select from "./common/Select";

type FormData = z.infer<typeof MovieSchema>;

const MovieForm = () => {
  const { id } = useParams();

  const currMovie = getMovies().find((movie) => movie._id === id);
  if (!currMovie && id !== "new") throw new Error("Movie not found");

  const genres = getGenres();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(MovieSchema),
  });

  const submitAction = (data: FieldValues) => {
    const genre = genres.find((genre) => genre._id === data.genre);
    const res = { ...data, genre };

    saveMovie(res as Movie);
    navigate("/");
  };

  return (
    <div>
      <h1>Movie Form</h1>
      <Form onSubmit={handleSubmit(submitAction)}>
        <Input
          id="title"
          register={register("title")}
          value={currMovie?.title}
          errorMessage={errors.title && errors.title.message}
        >
          Title
        </Input>
        <Select
          id="genre"
          options={genres}
          register={register("genre")}
          defaultValue={currMovie?.genre._id}
          errorMessage={errors.genre && errors.genre.message}
        >
          Genre
        </Select>
        <Input
          type="number"
          id="numberInStock"
          register={register("numberInStock", { valueAsNumber: true })}
          value={currMovie?.numberInStock}
          errorMessage={errors.numberInStock && errors.numberInStock.message}
        >
          Number In Stock
        </Input>
        <Input
          type="number"
          id="rate"
          register={register("dailyRentalRate", { valueAsNumber: true })}
          value={currMovie?.dailyRentalRate}
          errorMessage={
            errors.dailyRentalRate && errors.dailyRentalRate.message
          }
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
