import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import ToastComponent from "../components/common/ToastComponent";
import { UserForm } from "../entities/User";
import useRegisterUser from "../hooks/useRegisterUser";
import UserSchema from "../schemas/UserSchema";

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(UserSchema),
  });

  const {
    mutate: registerUser,
    isSuccess,
    error: registerError,
  } = useRegisterUser();

  const submitAction = (data: UserForm) => {
    registerUser(data);
    if (isSuccess) navigate("/login");
  };

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
          errorMessage={errors?.email?.message}
        >
          E-mail
        </Input>
        <Input
          id="registerName"
          register={register("name")}
          errorMessage={errors?.name?.message}
        >
          Name
        </Input>
        <Input
          id="registerPassword"
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

export default RegisterForm;
