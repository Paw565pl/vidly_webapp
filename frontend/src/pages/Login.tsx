import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import ToastComponent from "../components/common/ToastComponent";
import { UserLoginData, loginSchema } from "../entities/Auth";
import useLoginUser from "../hooks/useLoginUser";

const LoginForm = () => {
  const [errorVisibility, setErrorVisibility] = useState(false);

  const { mutate: loginUser, error: loginError } = useLoginUser();

  const { register, handleSubmit } = useForm<UserLoginData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const submitAction = (data: UserLoginData) => {
    loginUser(data);
    if (!loginError) navigate("/");
  };

  const submitFail = () => {
    setErrorVisibility(true);
    setTimeout(() => {
      setErrorVisibility(false);
    }, 5100);
  };

  return (
    <div>
      {errorVisibility && (
        <ToastComponent bg="danger">
          Either email or password are wrong.
        </ToastComponent>
      )}

      <h1>Login</h1>
      <Form onSubmit={handleSubmit(submitAction, submitFail)}>
        <Input
          id="loginEmail"
          type="email"
          register={register("email")}
          autofocus={true}
        >
          Email
        </Input>
        <Input
          id="loginPassword"
          register={register("password")}
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
