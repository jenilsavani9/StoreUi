import React, { useState, useEffect } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
import { useStateValue } from "../../contexts/StateProvider";
import jwtDecode from "jwt-decode";

function Navbar() {

    var nav = useNavigate();

    const [{ user }] = useStateValue();
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
            const decoded = jwt_decode(token);

            setFirstName(decoded.FirstName);
            setLastName(decoded.LastName);
            // setLastLogin(JSON.parse(decoded.lastLogin));
            if (decoded.role == "admin") {
                setAdmin(true)
            }
        } catch (error) {
            nav('/login');
        }
    }, [])

    const LogoutUser = () => {
        localStorage.removeItem('token');
        nav('/login')
    }

    var loginButton;
    if (token == null) {
        loginButton = <div className="d-flex"><Link to="/login"><button className="btn btn-light">Login</button></Link></div>;
    } else {
        loginButton = <div className="d-flex align-items-center text-white">{FirstName} {LastName}<Link to="/login"><button className="btn btn-light ms-2" onClick={LogoutUser}>Logout</button></Link></div>;
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
