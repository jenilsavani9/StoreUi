import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert2';
import { useDeviceSelectors } from 'react-device-detect';
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import { GetUserInfoData, LoginResponse } from '../services/User';

function Login() {

    // for getting device information use : react-device-detect
    // const [selectors, data] = useDeviceSelectors(window.navigator.userAgent);

    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const changeInputPassword = (event) => {
        setPassword(event.target.value)
    }

    const changeInputEmail = (event) => {
        setEmail(event.target.value)
    }

    const SubmitLoginForm = async (event) => {
        event.preventDefault();
        // const { osName, browserName } = selectors;
        try {
            var LastLogin = {}
            try {
                const DeviceInfo = await GetUserInfoData();
                const date = new Date();
                LastLogin = {
                    // "osName": osName,
                    // "browserName": browserName,
                    "IPv4": DeviceInfo.data.IPv4,
                    "date": date
                }
            } catch (error) {
            }

            if (email == '') {
                toast.error("🦄 Email Can't be null!", {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "dark",
                });
            }else if(password == '' || password.length < 5) {
                toast.error("🦄 Password is not valid!", {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "dark",
                });
            } 
            else {
                const response = await LoginResponse(email, password, JSON.stringify(LastLogin))
                localStorage.setItem('token', response.data)
                nav('/');
            }


        } catch (error) {
            toast.error('🦄 Some Error Occurred!', {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
            });
        }


    }

    return (

        <div className='container-md' id='login-form' >
            <form className='row align-items-center' id='login-form-values'>
                <h2>Login</h2>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={changeInputEmail} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={changeInputPassword} />
                </div>
                <div>
                    <button onClick={SubmitLoginForm} type="button" className="btn btn-dark px-3">Submit</button>
                </div>

            </form>
        </div>
    )
}

export default Login