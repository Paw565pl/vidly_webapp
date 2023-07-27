import { HTMLInputTypeAttribute, ReactNode } from "react";
import { Form } from "react-bootstrap";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  id: string;
  register: UseFormRegisterReturn;
  children: ReactNode;
  type?: HTMLInputTypeAttribute;
  autofocus?: boolean;
}

const Input = ({ id, register, children, type, autofocus }: Props) => {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{children}</Form.Label>
      <Form.Control {...register} type={type || "text"} autoFocus={autofocus} />
    </Form.Group>
  );
};

export default Input;
