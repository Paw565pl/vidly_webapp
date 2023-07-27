import { HTMLInputTypeAttribute, ReactNode } from "react";
import { Form } from "react-bootstrap";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  id: string;
  register: UseFormRegisterReturn;
  children: ReactNode;
  errorMessage?: string;
  type?: HTMLInputTypeAttribute;
  value?: string | number;
  autofocus?: boolean;
}

const Input = ({
  id,
  register,
  children,
  errorMessage,
  type,
  value,
  autofocus,
}: Props) => {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{children}</Form.Label>
      <Form.Control
        {...register}
        type={type || "text"}
        autoFocus={autofocus}
        value={value}
      />
      {errorMessage && (
        <Form.Text className="text-danger">{errorMessage}</Form.Text>
      )}
    </Form.Group>
  );
};

export default Input;