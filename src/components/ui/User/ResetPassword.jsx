import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { LoginResponse, PasswordResetByUser } from '../../../services/User';

function ResetPassword(props) {

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
        if (newPass != conPass) {
            toast.error('🦄 New Password and Confirm password must be same!', {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
            });
        } else if(newPass == tempPass ) {
            toast.error('🦄 New Password and Old password must be different!', {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
            });
        }
        else {
            try {
                const loginResponse = await LoginResponse(props.email, tempPass, "")
                const response = await PasswordResetByUser(loginResponse.data, props.email, tempPass, newPass)
                if (response.data.status == true) {
                    swal.fire({
                        title: 'Success!',
                        text: "Password changed successfully",
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    }).then(() => {
                        nav('/login');
                    })
                } else {
                    toast.error('🦄 Some Error Occurred!', {
                        position: "top-right",
                        autoClose: 5000,
                        theme: "dark",
                    });
                }
            } catch (error) {
                toast.error('🦄 Some Error Occurred!', {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "dark",
                });
            }
        }

    }

    return (
        <div>
            <h3>Reset Password</h3>
            <form className='row g-3 needs-validation' noValidate onSubmit={onHandleSubmit}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email </label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={props.email} disabled />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        Email is not valid.
                    </div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Temprary Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={tempPass} minLength="5" onChange={(e) => setTempPass(e.target.value)} />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        old Password is not valid.
                    </div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword2" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" value={newPass} minLength="5" onChange={(e) => setNewPass(e.target.value)} />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        New Password is not valid.
                    </div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword3" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword3" value={conPass} minLength="5" onChange={(e) => setConPass(e.target.value)} />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        Confirm Password is not valid.
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default ResetPassword