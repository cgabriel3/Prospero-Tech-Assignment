import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../stores/actions";

export default function LoginPage() {
  const [input, setInput] = useState({ receiptNumber: null });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(input)).then((err) => {
      if (!err) {
        navigate("/");
      }
    });
  };
  return (
    <>
      <div className="container">
        <h1 className="display-2 text-center mt-5 pt-5 fw-normal">
          Pelaporan Pajak
        </h1>
      </div>
      <div
        className="container border border-2 rounded p-3 position-absolute top-50 start-50 translate-middle"
        style={{ width: "40%" }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Masukkan Email"
              value={input.email}
              name="email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Masukkan Kata Sandi"
              value={input.password}
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
