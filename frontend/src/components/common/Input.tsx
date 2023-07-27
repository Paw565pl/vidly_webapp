import { HTMLInputTypeAttribute, ReactNode } from "react";
import { Form } from "react-bootstrap";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  id: string;
  register?: UseFormRegisterReturn;
  children?: ReactNode;
  errorMessage?: string;
  type?: HTMLInputTypeAttribute;
  value?: string | number;
  autofocus?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const Input = ({
  id,
  register,
  children,
  errorMessage,
  type,
  value,
  autofocus,
  placeholder,
  onChange,
}: Props) => {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{children}</Form.Label>
      <Form.Control
        {...register}
        type={type || "text"}
        autoFocus={autofocus}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
      {errorMessage && (
        <Form.Text className="text-danger">{errorMessage}</Form.Text>
      )}
    </Form.Group>
  );
};

export default Input;
