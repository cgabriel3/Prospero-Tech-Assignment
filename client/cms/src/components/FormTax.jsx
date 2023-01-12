import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTax } from "../stores/actions";

export default function FormTax(props) {
  const [input, setInput] = useState({ receiptNumber: null });

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createTax(input)).then((_) => {
      setInput("");
      props.onHide();
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Laporan Pajak
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Col} md="10" className="mb-3">
            <Form.Label>Nomor Resi</Form.Label>
            <Form.Control
              type="text"
              placeholder="123456789"
              value={input.receiptNumber}
              name="receiptNumber"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} md="2" className="mb-3">
            <Button type="submit" className="float-end mt-3 me-3">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
