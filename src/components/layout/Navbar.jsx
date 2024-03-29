import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { TOAST_CONSTANT } from "../../constants/constant";
import { useStateValue } from "../../contexts/StateProvider";
import { ForgotPasswordService } from "../../services/User";

function Navbar() {

  var nav = useNavigate();

  const [{ }] = useStateValue();
  const [token, setToken] = useState(localStorage.getItem('token'))

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  // const [lastLogin, setLastLogin] = useState();
  const [admin, setAdmin] = useState(false)

  const checkTokenExpirationMiddleware = () => {
    try {
      const token = localStorage.getItem("token");
      if (token && jwtDecode(token).exp < Date.now() / 1000) {
        localStorage.clear();
        nav('/login');
      }

    } catch (error) {
      localStorage.clear();
      nav('/login')
    }
  };

  useEffect(() => {
    try {
      checkTokenExpirationMiddleware();
      setToken(localStorage.getItem('token'))
      setFirstName(localStorage.getItem('FirstName'));
      setLastName(localStorage.getItem('LastName'));
      // setLastLogin(JSON.parse(decoded.lastLogin));
      var decoded = jwtDecode(token)
      if (decoded.role == "admin") {
        setAdmin(true)
      }
    } catch (error) {
      nav('/login');
    }
  }, [])

  const LogoutUser = () => {
    localStorage.clear();
    nav('/login')
  }

  const ForgotPassword = async () => {
    Swal.fire({
      title: 'Do you want to Reset Password?',
      showCancelButton: true,
      confirmButtonText: 'Reset',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const loadingToast = toast.loading("Please wait...")
        var result = await ForgotPasswordService(localStorage.getItem('UserId'))
        toast.update(loadingToast, {
          render: '🦄 Email sent to your register email id!!!',
          type: "success",
          position: TOAST_CONSTANT.position,
          autoClose: TOAST_CONSTANT.autoClose,
          theme: TOAST_CONSTANT.theme,
          isLoading: false
        });

      } else if (result.isDenied) {
        toast.error('🦄 Some Error Occurred!', {
          position: TOAST_CONSTANT.position,
          autoClose: TOAST_CONSTANT.autoClose,
          theme: TOAST_CONSTANT.theme,
        });
      }
    })
  }

  var loginButton;
  if (token == null) {
    loginButton = <div className="d-flex"><Link to="/login"><button className="btn btn-light">Login</button></Link></div>;
  } else {
    loginButton = <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        {FirstName} {LastName}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={ForgotPassword}>Forgot Password</Dropdown.Item>
        <Dropdown.Item onClick={LogoutUser}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  }

  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-md bg-dark navbar-expand-lg" data-bs-theme="dark">
        <div className="container container-fluid">
          <Link to="/" className="navbar-brand">
            LightSpeed
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link to="/" className="nav-link active">Stores</Link></li>
              <li className="nav-item"><Link to="/features" className="nav-link active">Features</Link></li>
              {admin ? <li className="nav-item"><Link to="/Users" className="nav-link active">Users</Link></li> : ""}

            </ul>

            {loginButton}

          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
