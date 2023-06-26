import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function ForgotPassword(sendEmailToResetPass) {

    const nav = useNavigate();

    const [newPass, setNewPass] = useState("");
    const [conPass, setConPass] = useState("");

    const onHandleSubmit = () => {
        alert("hello")
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