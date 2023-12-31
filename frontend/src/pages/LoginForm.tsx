import { zodResolver } from "@hookform/resolvers/zod";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Input from "../components/common/Input";
import ToastComponent from "../components/common/ToastComponent";
import { UserLoginData } from "../entities/Auth";
import useLoginUser from "../hooks/useLoginUser";
import { loginSchema } from "../schemas/UserSchema";

const LoginForm = () => {
  const { register, handleSubmit } = useForm<UserLoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: loginUser, error: loginError } = useLoginUser();
  const submitAction = (data: UserLoginData) =>
    loginUser(data, {
      onSuccess: () => (window.location.href = "/"),
    });

  return (
    <div>
      {loginError && (
        <ToastComponent bg="danger">
          Either email or password are wrong.
        </ToastComponent>
      )}

      <h1>Login</h1>
      <Form onSubmit={handleSubmit(submitAction)}>
        <Input
          id="loginEmail"
          type="email"
          register={register("email")}
          autoFocus
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
