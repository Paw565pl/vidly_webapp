import { ReactNode } from "react";
import { Form, FormControlProps } from "react-bootstrap";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props extends FormControlProps {
  id: string;
  register?: UseFormRegisterReturn;
  children?: ReactNode;
  errorMessage?: string;
}

const Input = ({
  id,
  register,
  children,
  errorMessage,
  ...inputProps
}: Props) => {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{children}</Form.Label>
      <Form.Control {...register} {...inputProps} />
      {errorMessage && (
        <Form.Text className="text-danger">{errorMessage}</Form.Text>
      )}
    </Form.Group>
  );
};

export default Input;
