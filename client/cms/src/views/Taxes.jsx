import { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { useEffect } from "react";
import { deleteTax, fetchTaxes } from "../stores/actions";
import FormTax from "../components/FormTax";

export default function Taxes() {
  const [modalShow, setModalShow] = useState(false);
  const [load, setLoad] = useState(true);
  const { taxes } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTaxes()).then((_) => setLoad(false));
    console.log(">>>>>>>>>", taxes);
  }, []);

  if (load) {
    return (
      <PulseLoader
        color="#6c757d"
        margin={5}
        // loading={load}
        size={20}
        speedMultiplier={1}
        cssOverride={{
          display: "block",
          margin: "80px",
        }}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="text-center"
      />
    );
  }

  function formatedDate(input) {
    let date = new Date(input);
    return date
      .toLocaleString("id-ID", {
        timeZone: "UTC",
      })
      .split(" ")[0];
  }

  return (
    <>
      <div className="container mt-3">
        <h1 className="display-2 mb-2">Pajak</h1>

        <Button
          variant="warning"
          className="mb-5"
          onClick={() => setModalShow("add")}
        >
          Tambah Pajak Baru
        </Button>

        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nomor Resi</th>
              <th>Tanggal dibuat</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {taxes.map((el, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{el.receiptNumber}</td>
                  <td>{formatedDate(el.createdAt)}</td>
                  <td>{el.status}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setModalShow("edit");
                      }}
                      className="me-2"
                    >
                      Ubah
                    </Button>
                    <Button
                      onClick={() => dispatch(deleteTax(el._id))}
                      variant="danger"
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <FormTax show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
