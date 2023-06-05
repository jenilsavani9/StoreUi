import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert2';
import { useDeviceSelectors } from 'react-device-detect';
import jwt_decode from "jwt-decode";
import { useStateValue } from './Context/StateProvider';


function Login() {

    // for getting device information use : react-device-detect
    const [selectors, data] = useDeviceSelectors(window.navigator.userAgent);

    const [{user}, dispatch] = useStateValue();

    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const changeInputPassword = (event) => {
        setPassword(event.target.value)
    }

    const changeInputEmail = (event) => {
        setEmail(event.target.value)
    }

    async function SetUserInContext() {
        if (localStorage.getItem('token') != null) {
            dispatch({
              type: 'SET_USER',
              user: await jwt_decode(localStorage.getItem('token'))
            })
          } else {
            await dispatch({
              type: 'SET_USER',
              user: null
            })
          }
    }

    const SubmitLoginForm = async (event) => {
        event.preventDefault();
        const { osName, browserName } = selectors;
        try {
            var LastLogin = {}
            try {
                const DeviceInfo = await axios({
                    method: 'get',
                    url: 'https://geolocation-db.com/json/',
                })
                const date = new Date();
                LastLogin = {
                    // "osName": osName,
                    // "browserName": browserName,
                    "IPv4": DeviceInfo.data.IPv4,
                    "date": date
                }
            } catch (error) {
                // swal.fire({
                //     title: 'Error!',
                //     text: LastLogin,
                //     icon: 'error',
                //     confirmButtonText: 'Cool'
                //   })
            }

            const response = await axios({
                method: 'post',
                url: 'https://localhost:44372/api/Login',
                data: {
                    emailId: email,
                    password: password,
                    LastLogin: JSON.stringify(LastLogin)
                }
            })
            localStorage.setItem('token', response.data)
            SetUserInContext();
            nav('/');
        } catch (error) {
            swal.fire({
                title: 'Error!',
                text: "Some Error Occure",
                icon: 'error',
                confirmButtonText: 'Cool'
            })
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