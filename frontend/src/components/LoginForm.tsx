import { zodResolver } from "@hookform/resolvers/zod";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import UserSchema from "../schemas/UserSchema";
import Input from "./common/Input";

type FormData = z.infer<typeof UserSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(UserSchema) });

  const submitAction = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit(submitAction)}>
        <Input
          id="loginUsername"
          register={register("username")}
          autofocus={true}
          errorMessage={errors.username && errors.username.message}
        >
          Username
        </Input>
        <Input
          id="loginPassword"
          register={register("password")}
          type={"password"}
          errorMessage={errors.password && errors.password.message}
        >
          Password
        </Input>
        <Button variant="primary" type="submit" disabled={!isValid}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
