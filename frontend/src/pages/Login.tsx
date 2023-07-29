import { zodResolver } from "@hookform/resolvers/zod";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../components/common/Input";
import UserSchema from "../schemas/UserSchema";

const schema = UserSchema.pick({ username: true, password: true });

type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
