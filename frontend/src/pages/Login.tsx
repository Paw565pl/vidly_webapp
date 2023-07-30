import { zodResolver } from "@hookform/resolvers/zod";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/common/Input";
import { UserLoginData, loginSchema } from "../entities/Auth";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginData>({ resolver: zodResolver(loginSchema) });

  const submitAction = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit(submitAction)}>
        <Input
          id="loginName"
          register={register("name")}
          autofocus={true}
          errorMessage={errors?.name?.message}
        >
          Name
        </Input>
        <Input
          id="loginPassword"
          register={register("password")}
          type={"password"}
          errorMessage={errors?.password?.message}
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
