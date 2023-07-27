import { ReactNode } from "react";
import { Form } from "react-bootstrap";
import { UseFormRegisterReturn } from "react-hook-form";

interface Item {
  [key: string]: string;
  _id: string;
  name: string;
}

interface Props {
  id: string;
  options: Item[];
  register: UseFormRegisterReturn;
  children: ReactNode;
  errorMessage?: string;
  defaultValue?: string | number;
  autofocus?: boolean;
}

const Select = ({
  id,
  options,
  register,
  children,
  errorMessage,
  defaultValue,
  autofocus,
}: Props) => {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{children}</Form.Label>
      <Form.Select
        {...register}
        autoFocus={autofocus}
        defaultValue={defaultValue}
      >
        <option value={""}></option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </Form.Select>
      {errorMessage && (
        <Form.Text className="text-danger">{errorMessage}</Form.Text>
      )}
    </Form.Group>
  );
};

export default Select;
