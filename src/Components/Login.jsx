import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert2';

function Login() {

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
        
        try {
            const response = await axios({
                method: 'post',
                url: 'https://localhost:44372/api/Login',
                data: {
                    emailId: email,
                    password: password
                }
            })
            localStorage.setItem('token', response.data)
            nav('/');
        } catch (error) {
            swal.fire({
                title: 'Error!',
                text: error.response.data,
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