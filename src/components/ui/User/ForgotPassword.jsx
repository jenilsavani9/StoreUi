import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { TOAST_CONSTANT } from '../../../constants/constant';
import { ChangePasswordService } from '../../../services/User';


function ForgotPassword(sendEmailToResetPass) {

    const nav = useNavigate();

    const [newPass, setNewPass] = useState("");
    const [conPass, setConPass] = useState("");

    const onHandleSubmit = async (event) => {
        event.preventDefault();
        var error = 0;
        if (newPass != conPass) {
            error += 1;
            toast.error('🦄 New Password and Confirm password must be same!', {
                position: TOAST_CONSTANT.position,
                autoClose: TOAST_CONSTANT.autoClose,
                theme: TOAST_CONSTANT.theme,
            });
        }
        if (newPass.length < 5) {
            error += 1;
            toast.error('🦄 Password Length Must be Greater than 5', {
                position: TOAST_CONSTANT.position,
                autoClose: TOAST_CONSTANT.autoClose,
                theme: TOAST_CONSTANT.theme,
            });
        }
        if (error == 0) {
            var token = localStorage.getItem("token");
            var UserId = localStorage.getItem("UserId");
            await ChangePasswordService(token, UserId, newPass)
            Swal.fire({
                title: 'Success!',
                text: "password changed!!!",
                icon: 'Success',
                confirmButtonText: 'Cool'
            }).then(() => {
                nav('/login');
            })
        }

    }


    return (
        <div>
            <h3>Reset Password</h3>
            <form className='row g-3 needs-validation' noValidate onSubmit={onHandleSubmit}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email </label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={sendEmailToResetPass.email} disabled />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword2" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" value={newPass} minLength="5" onChange={(e) => setNewPass(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword3" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword3" value={conPass} minLength="5" onChange={(e) => setConPass(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default ForgotPassword