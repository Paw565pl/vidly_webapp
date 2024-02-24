import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import ToastComponent from "../components/common/ToastComponent";
import { AuthContext } from "../contexts/AuthContextProvider";
import useLoginUser from "../hooks/useLoginUser";
import { UserLoginFormValues, loginSchema } from "../schemas/UserSchema";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors: validationErrors },
  } = useForm<UserLoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: loginUser, error: loginError } = useLoginUser();
  const submitAction = (data: UserLoginFormValues) =>
    loginUser(data, {
      onSuccess: () => navigate("/movies"),
    });

  const { isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) return <Navigate to={"/movies"} replace />;

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
          errorMessage={validationErrors.email?.message}
          autoFocus
        >
          Email
        </Input>
        <Input
          id="loginPassword"
          register={register("password")}
          errorMessage={validationErrors.password?.message}
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
