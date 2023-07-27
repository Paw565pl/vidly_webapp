import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import MovieSchema from "../schemas/MovieSchema";
import { getMovies } from "../services/fakeMovieService";
import Input from "./common/Input";

type FormData = z.infer<typeof MovieSchema>;

const MovieForm = () => {
  const { id } = useParams();

  const currMovie = getMovies().find((movie) => movie._id === id);
  if (!currMovie && id !== "new") throw new Error("Movie not found");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(MovieSchema),
  });

  const submitAction = (data: FieldValues) => {
    console.log(data);
    // navigate("/")
  };

  return (
    <div>
      <h1>Movie Form</h1>
      <Form onSubmit={handleSubmit(submitAction)}>
        <Input
          id="title"
          register={register("title")}
          errorMessage={errors.title && errors.title.message}
        >
          Title
        </Input>
        <Input
          id="genre"
          register={register("genre")}
          errorMessage={errors.genre && errors.genre.message}
        >
          Genre
        </Input>
        <Input
          type="number"
          id="numberInStock"
          register={register("numberInStock", { valueAsNumber: true })}
          errorMessage={errors.numberInStock && errors.numberInStock.message}
        >
          Number In Stock
        </Input>
        <Input
          type="number"
          id="rate"
          register={register("rate", { valueAsNumber: true })}
          errorMessage={errors.rate && errors.rate.message}
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
