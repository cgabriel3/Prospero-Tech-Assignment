import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { updateTax } from "../stores/actions";
import { useEffect } from "react";

export default function FormTaxEdit(props) {
  const dispatch = useDispatch();

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="ms-2 my-1">
          Ubah Status Pajak
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead pb-3 ms-2">
          Nomor Resi : {props?.taxDetail?.receiptNumber}
        </p>
        <div className="container d-flex justify-content-center my-4">
          {props.role === "CHECKER" && (
            <Button
              variant="primary"
              onClick={() => {
                dispatch(updateTax(props?.taxDetail?._id, "Checked")).then(
                  (_) => {
                    props.onHide();
                  }
                );
              }}
              className="me-5"
            >
              <h1 className="h5 fw-bolder m-2">Check</h1>
            </Button>
          )}
          {props.role === "APPROVER" && (
            <Button
              variant="primary"
              onClick={() => {
                dispatch(updateTax(props?.taxDetail?._id, "Approved")).then(
                  (_) => {
                    props.onHide();
                  }
                );
              }}
              className="me-5"
            >
              <h1 className="h5 fw-bolder m-2">Approve</h1>
            </Button>
          )}
          <Button
            onClick={() => {
              dispatch(updateTax(props?.taxDetail?._id, "Rejected")).then(
                (_) => {
                  props.onHide();
                }
              );
            }}
            variant="danger"
          >
            <h1 className="h5 fw-bolder m-2">Reject</h1>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
