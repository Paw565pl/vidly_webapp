import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import useGenres from "../hooks/useGenres";
import useMovies from "../hooks/useMovies";
import MovieSchema from "../schemas/MovieSchema";
import createSlug from "../utils/createSlug";

type FormData = z.infer<typeof MovieSchema>;

const MovieForm = () => {
  const { data: movies } = useMovies();
  const { data: genres } = useGenres();

  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(MovieSchema),
  });

  const currMovie = movies?.find((movie) => createSlug(movie.title) === slug);

  if (!currMovie && slug !== "new") throw new Error("Movie not found");

  const submitAction = (data: FieldValues) => {
    const genre = genres?.find((genre) => genre._id === data.genre);
    const res = { ...data, genre };

    // TODO: saveMovie
    navigate("/");
  };

  return (
    <div>
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
          register={register("genre")}
          defaultValue={currMovie?.genre._id}
          errorMessage={errors?.genre?.message}
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
