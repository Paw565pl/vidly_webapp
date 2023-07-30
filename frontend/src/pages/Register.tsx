import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import ToastComponent from "../components/common/ToastComponent";
import { UserRegisterData } from "../entities/User";
import useCurrentUser from "../hooks/useCurrentUser";
import useRegisterUser from "../hooks/useRegisterUser";
import UserSchema from "../schemas/UserSchema";

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors: validationErrors },
  } = useForm<UserRegisterData>({
    resolver: zodResolver(UserSchema),
  });

  const { mutate: registerUser, error: registerError } = useRegisterUser();
  const submitAction = (data: UserRegisterData) =>
    registerUser(data, {
      onSuccess: () => navigate("/login"),
    });

  const { getUser } = useCurrentUser();
  if (getUser()) return <Navigate to={"/"} />;

  return (
    <div>
      {registerError && (
        <ToastComponent bg="danger">
          {registerError.response?.status === 400
            ? "This user already exists! Try to login instead."
            : "Oops. Something went wrong. Your account wasn't created."}
        </ToastComponent>
      )}

      <h1>Register</h1>
      <Form onSubmit={handleSubmit(submitAction)}>
        <Input
          id="registerEmail"
          register={register("email")}
          type="email"
          autofocus={true}
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
