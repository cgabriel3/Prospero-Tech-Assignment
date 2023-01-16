import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser, updateUser } from "../stores/actions";
import { useEffect } from "react";

export default function FormUser(props) {
  const [input, setInput] = useState({});

  useEffect(() => {
    if (props.show === "edit")
      setInput({
        name: props.userDetail?.name,
        email: props.userDetail?.email,
        role: props.userDetail?.role,
      });
    else
      setInput({
        name: "",
        email: "",
      });
  }, [props.show, props.userDetail]);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.show === "add")
      dispatch(createUser(input)).then((_) => {
        props.onHide();
      });
    else
      dispatch(updateUser(props.userDetail._id, input)).then((_) => {
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
          {props.show === "add" ? "Form User" : "Edit User"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nama Lengkap"
              value={input.name}
              name="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email User"
              value={input.email}
              name="email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label>Kata Sandi</Form.Label>
            <Form.Control
              type="password"
              placeholder="Masukkan Kata Sandi"
              value={input.password}
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          {/* <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label>Konfirmasi Kata Sandi</Form.Label>
            <Form.Control
              type="password"
              placeholder="Masukkan kembali Kata Sandi"
              value={input.password2}
              name="password2"
              onChange={handleChange}
            />
          </Form.Group> */}
          <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label>Posisi</Form.Label>
            <Form.Select
              aria-label="Pilih Posisi"
              name="role"
              value={input.role}
              onChange={handleChange}
            >
              <option value={""} disabled selected>
                Open this select menu
              </option>
              {["ADMIN", "MAKER", "CHECKER", "APPROVER"].map((el, i) => (
                <option value={el} key={i}>
                  {el}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button type="submit" className="float-end mt-3 me-3">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
