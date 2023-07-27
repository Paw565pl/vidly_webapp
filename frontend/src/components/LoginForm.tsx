import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FieldValues, useForm } from "react-hook-form";
import Input from "./common/Input";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();

  const submitAction = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit(submitAction)}>
        <Input
          id="loginUsername"
          register={register("loginUsername")}
          autofocus={true}
        >
          Username
        </Input>
        <Input
          id="loginPassword"
          register={register("loginPassword")}
          type={"password"}
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
