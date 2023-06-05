import React, { useState, useEffect } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
import { useStateValue } from "../Context/StateProvider";

function Navbar() {

    var nav = useNavigate();

    const [{ user }] = useStateValue();
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    // const [lastLogin, setLastLogin] = useState();
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        try {
            setToken(localStorage.getItem('token'))
            const decoded = jwt_decode(token);

            setFirstName(user.FirstName);
            setLastName(user.LastName);
            // setLastLogin(JSON.parse(decoded.lastLogin));
            if(user.role == "admin") {
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
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark navbar-expand-lg" data-bs-theme="dark">
                <div className="container container-fluid">
                    <Link to="/" className="navbar-brand">
                        Stores
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
                            <li className="nav-item"><Link to="/" className="nav-link active">Home</Link></li>
                            <li className="nav-item"><Link to="/services" className="nav-link active">Services</Link></li>
                            {admin? <li className="nav-item"><Link to="/Users" className="nav-link active">Users</Link></li> : "" }
                            
                        </ul>

                        {loginButton}


                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
