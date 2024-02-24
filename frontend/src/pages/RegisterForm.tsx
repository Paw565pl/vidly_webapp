import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import ToastComponent from "../components/common/ToastComponent";
import { AuthContext } from "../contexts/AuthContextProvider";
import useRegisterUser from "../hooks/useRegisterUser";
import UserSchema, { UserRegisterFormValues } from "../schemas/UserSchema";

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors: validationErrors },
  } = useForm<UserRegisterFormValues>({
    resolver: zodResolver(UserSchema),
  });

  const { mutate: registerUser, error: registerError } = useRegisterUser();
  const submitAction = (data: UserRegisterFormValues) =>
    registerUser(data, {
      onSuccess: () => navigate("/login"),
    });

  const { isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) return <Navigate to={"/movies"} replace />;

  return (
    <div>
      {registerError && (
        <ToastComponent bg="danger">
          {registerError.response?.status === 400
            ? "This user already exists!"
            : "Oops. Something went wrong. Your account wasn't created."}
        </ToastComponent>
      )}

      <h1>Register</h1>
      <Form onSubmit={handleSubmit(submitAction)}>
        <Input
          id="registerEmail"
          register={register("email")}
          type="email"
          autoFocus
          errorMessage={validationErrors?.email?.message}
        >
          E-mail
        </Input>
        <Input
          id="registerName"
          register={register("name")}
          errorMessage={validationErrors?.name?.message}
        >
          Name
        </Input>
        <Input
          id="registerPassword"
          register={register("password")}
          type={"password"}
          errorMessage={validationErrors?.password?.message}
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
