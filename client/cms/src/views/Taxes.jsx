import { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { useEffect } from "react";
import { fetchTaxDetail, fetchTaxes } from "../stores/actions";
import FormTax from "../components/FormTax";
import FormTaxEdit from "../components/FormTaxEdit";

export default function Taxes() {
  const [modalShow, setModalShow] = useState(false);
  const [load, setLoad] = useState(true);
  const [edit, setEdit] = useState(false);

  const { taxes, taxDetail, loggedUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTaxes()).then((_) => setLoad(false)); // eslint-disable-next-line
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
    return date.toLocaleString("id-ID").split(" ")[0];
  }

  return (
    <>
      <div className="container mt-3">
        <h1 className="display-2 mb-2">Pajak</h1>

        {loggedUser.role === "MAKER" && (
          <Button
            variant="warning"
            className="mb-5"
            onClick={() => setModalShow("add")}
          >
            Tambah Pajak Baru
          </Button>
        )}
        {loggedUser.role !== "MAKER" && <div className="mb-5" />}

        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nomor Resi</th>
              <th>Tanggal dibuat</th>
              <th>Diubah oleh</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {taxes.map((el, i) => {
              return (
                <tr
                  key={i}
                  className={
                    (el.status === "Rejected" ? "text-muted" : "") +
                    " align-middle"
                  }
                >
                  <td>{i + 1}</td>
                  <td>{el.receiptNumber}</td>
                  <td>{formatedDate(el.createdAt)}</td>
                  <td>{el.updatedBy.name}</td>
                  <td>{el.status}</td>
                  {(loggedUser.role === "CHECKER" ||
                    loggedUser.role === "APPROVER") && (
                    <td>
                      {el.status !== "Rejected" &&
                        loggedUser.role.charAt(0) +
                          loggedUser.role.slice(1, -1).toLowerCase() +
                          "d" !==
                          el.status && (
                          <Button
                            variant="primary"
                            onClick={() => {
                              dispatch(fetchTaxDetail(el._id));
                              setEdit(true);
                            }}
                            className="me-2"
                          >
                            Ubah
                          </Button>
                        )}

                      {/* <Button
                      onClick={() => dispatch(deleteTax(el._id))}
                      variant="danger"
                    >
                      Hapus
                    </Button> */}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <FormTax show={modalShow} onHide={() => setModalShow(false)} />
      <FormTaxEdit
        show={edit}
        onHide={() => setEdit(false)}
        taxDetail={taxDetail}
        role={loggedUser.role}
      />
    </>
  );
}
