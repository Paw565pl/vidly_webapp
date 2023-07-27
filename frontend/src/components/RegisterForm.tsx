import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import UserSchema from "../schemas/UserSchema";
import Input from "./common/Input";

type FormData = z.infer<typeof UserSchema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  });

  const submitAction = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit(submitAction)}>
        <Input
          id="registerEmail"
          register={register("email")}
          type="email"
          autofocus={true}
          errorMessage={errors.email && errors.email.message}
        >
          E-mail
        </Input>
        <Input
          id="registerUsername"
          register={register("username")}
          errorMessage={errors.username && errors.username.message}
        >
          Username
        </Input>
        <Input
          id="registerPassword"
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

export default RegisterForm;
