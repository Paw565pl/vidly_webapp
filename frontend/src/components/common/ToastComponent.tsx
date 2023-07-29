import { ReactNode, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

interface Props {
  bg?: string;
  children: ReactNode;
}

const ToastComponent = ({ bg, children }: Props) => {
  const [show, setShow] = useState(true);

  return (
    <ToastContainer position="top-center" className="mt-4">
      <Toast
        animation={true}
        show={show}
        onClose={() => setShow((prev) => !prev)}
        delay={5000}
        autohide
        bg={bg}
        className="text-light d-block"
      >
        <Toast.Header>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastComponent;
