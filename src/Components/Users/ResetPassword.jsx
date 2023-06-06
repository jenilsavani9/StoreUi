import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import { BASE_URL } from '../../constants/regex';

function ResetPassword(sendEmailToResetPass) {

    const nav = useNavigate();
    // useStates for reset password form
    const [tempPass, setTempPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [conPass, setConPass] = useState("");

    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

    async function onHandleSubmit(event) {
        event.preventDefault();
        if(newPass != conPass) {
            swal.fire({
                title: 'Error!',
                text: "New Password and Confirm password must be same!",
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        } 
        else {
            try {
                const loginResponse = await axios({
                    method: 'post',
                    url: `${BASE_URL.URL}/api/Login`,
                    data: {
                        emailId: sendEmailToResetPass.email,
                        password: tempPass
                    }
                })
                const response = await axios({
                    method: 'post',
                    headers: { Authorization: `Bearer ${loginResponse.data}` },
                    url: `${BASE_URL.URL}/api/Login/resetpassword?email=${sendEmailToResetPass.email}&password=${tempPass}&newPassword=${newPass}`
                })
                if(response.data.status == true) {
                    swal.fire({
                        title: 'Success!',
                        text: "Password changed successfully",
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    }).then(() => {
                        nav('/login');
                    })
                } else {
                    swal.fire({
                        title: 'Error!',
                        text: "Some Error Occur",
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                }
            } catch (error) {
                swal.fire({
                        title: 'Error!',
                        text: "Some Error Occur",
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
            }
        }
        
    }

    return (
        <div>
            <h3>Reset Password</h3>
            <form className='row g-3 needs-validation' noValidate onSubmit={onHandleSubmit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email </label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={sendEmailToResetPass.email} disabled />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        Email is not valid.
                    </div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Temprary Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" value={tempPass} minLength="5" onChange={(e) => setTempPass(e.target.value)} />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        old Password is not valid.
                    </div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword2" class="form-label">New Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword2" value={newPass} minLength="5" onChange={(e) => setNewPass(e.target.value)} />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        New Password is not valid.
                    </div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword3" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword3" value={conPass} minLength="5" onChange={(e) => setConPass(e.target.value)} />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        Confirm Password is not valid.
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default ResetPassword