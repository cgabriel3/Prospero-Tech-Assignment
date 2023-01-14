import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTax } from "../stores/actions";
import { useEffect } from "react";

export default function FormTaxEdit(props) {
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateTax(props?.taxDetail?._id, status)).then((_) => {
      props.onHide();
    });
  };

  useEffect(() => {
    setStatus(props.taxDetail?.status);
  }, [props.show, props.taxDetail]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ubah Status Pajak
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label>Posisi</Form.Label>
            <Form.Select
              aria-label="Pilih Status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value={""} disabled selected>
                Open this select menu
              </option>
              {["Created", "Checked", "Rejected", "Approved"].map((el, i) => (
                <option value={el} key={i}>
                  {el}
                </option>
              ))}
            </Form.Select>
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
