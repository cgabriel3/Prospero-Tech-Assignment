import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserDetail } from "../stores/actions";
import FormUser from "./FormUser";

export default function NavBar() {
  const { loggedUser } = useSelector((state) => state);
  const [modalShow, setModalShow] = useState(false);
  const { users, userDetail } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: "user/logout" });
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#" to="/">
            Pelaporan Pajak
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" href="#" to="/">
                  Pajak
                </Link>
              </li>
              {loggedUser.role === "ADMIN" && (
                <li className="nav-item">
                  <Link className="nav-link" href="#" to="users">
                    Users
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <Dropdown>
          <DropdownButton
            id="dropdown-button-dark-example2"
            variant="secondary"
            // menuVariant="dark"
            title={loggedUser.name}
            // className="align-items-center"
          >
            <Dropdown.Item
              href="#"
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchUserDetail(loggedUser._id));
                setModalShow("edit");
              }}
            >
              Ubah Akun
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#" onClick={handleLogout}>
              Log Out
            </Dropdown.Item>
          </DropdownButton>
        </Dropdown>
        <div style={{ width: "5%" }}></div>
      </nav>

      <FormUser
        show={modalShow}
        onHide={() => setModalShow(false)}
        userDetail={userDetail}
      />
    </>
  );
}
