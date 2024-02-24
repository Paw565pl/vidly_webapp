import { ReactNode } from "react";
import { Form, FormSelectProps } from "react-bootstrap";
import { UseFormRegisterReturn } from "react-hook-form";

interface Item {
  _id: string;
  name: string;
}

interface Props extends FormSelectProps {
  id: string;
  options: Item[];
  register?: UseFormRegisterReturn;
  children?: ReactNode;
  errorMessage?: string;
}

const Select = ({
  id,
  options,
  register,
  children,
  errorMessage,
  ...props
}: Props) => {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{children}</Form.Label>
      <Form.Select {...register} {...props}>
        <option value={""}>Select one</option>
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
