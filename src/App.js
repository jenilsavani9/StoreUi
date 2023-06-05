import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Services from "./Components/Services";
import Store from "./Components/Store/Store";
import Users from "./Components/Users/Users";
import Login from "./Components/Login";
import EmailValidation from "./Components/EmailValidation";
import PageNotFound from "./Components/PageNotFound";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useStateValue } from "./Components/Context/StateProvider";


function App() {

    const [{ }, dispatch] = useStateValue();

    async function SetUserInContext() {
        if (localStorage.getItem('token') != null) {
            dispatch({
                type: 'SET_USER',
                user: await jwt_decode(localStorage.getItem('token'))
            })
        }
    }

    useEffect(() => {

        SetUserInContext();

    }, [])


    return (
        <div className="App">
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/verify" element={<EmailValidation />} />
                <Route exact path="/" element={<Store />} />
                <Route exact path="/services" element={<Services />} />
                <Route exact path="/Users" element={<Users />} />
                <Route path="/404" element={<PageNotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </div>
    );
}

export default App;
