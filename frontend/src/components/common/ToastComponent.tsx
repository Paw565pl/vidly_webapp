import { ReactNode, useState } from "react";
import { Toast } from "react-bootstrap";

interface Props {
  bg?: string;
  children: ReactNode;
}

const ToastComponent = ({ bg, children }: Props) => {
  const [show, setShow] = useState(true);

  return (
    <>
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
    </>
  );
};

export default ToastComponent;
