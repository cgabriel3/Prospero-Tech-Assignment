import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import FormUser from "../components/FormUser";
import { deleteUser, fetchUserDetail, fetchUsers } from "../stores/actions";

export default function Users() {
  const [modalShow, setModalShow] = useState(false);
  const [load, setLoad] = useState(true);

  const { users, userDetail } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers()).then((_) => setLoad(false));
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

  return (
    <>
      <div className="container mt-3">
        <h1 className="display-2 mb-2">Users</h1>

        <Button
          variant="warning"
          className="mb-5"
          onClick={() => setModalShow("add")}
        >
          Tambah User Baru
        </Button>

        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Posisi</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((el, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.role}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        dispatch(fetchUserDetail(el._id));
                        setModalShow("edit");
                      }}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => dispatch(deleteUser(el._id))}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <FormUser
        show={modalShow}
        onHide={() => setModalShow(false)}
        userDetail={userDetail}
      />
    </>
  );
}
