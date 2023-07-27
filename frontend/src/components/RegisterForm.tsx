import { Button, Form } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import Input from "./common/Input";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();

  const submitAction = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit(submitAction)}>
        <Input
          id="registerEmail"
          register={register("registerEmail")}
          type="email"
          autofocus={true}
        >
          E-mail
        </Input>
        <Input id="registerUsername" register={register("registerUsername")}>
          Username
        </Input>
        <Input
          id="registerPassword"
          register={register("registerPassword")}
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

export default RegisterForm;
