import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { TOAST_CONSTANT } from '../../../constants/constant';
import { LoginResponse, PasswordResetByUser } from '../../../services/User';

function ResetPassword(props) {

  const nav = useNavigate();
  // useStates for reset password form
  const [tempPass, setTempPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [conPass, setConPass] = useState("");

  async function onHandleSubmit(event) {
    event.preventDefault();
    if (newPass != conPass) {
      toast.error('🦄 New Password and Confirm password must be same!', {
        position: TOAST_CONSTANT.position,
        autoClose: TOAST_CONSTANT.autoClose,
        theme: TOAST_CONSTANT.theme,
      });
    } else if (newPass == tempPass) {
      toast.error('🦄 New Password and Old password must be different!', {
        position: TOAST_CONSTANT.position,
        autoClose: TOAST_CONSTANT.autoClose,
        theme: TOAST_CONSTANT.theme,
      });
    }
    else {
      try {
        const loginResponse = await LoginResponse(props.email, tempPass, "")
        const response = await PasswordResetByUser(loginResponse.data.payload.token, props.email, tempPass, newPass)
        if (response.data.status == 200) {
          Swal.fire({
            title: 'Success!',
            text: "Password changed successfully",
            icon: 'success',
            confirmButtonText: 'Cool'
          }).then(() => {
            nav('/login');
          })
        } else {
          toast.error('🦄 Some Error Occurred!', {
            position: TOAST_CONSTANT.position,
            autoClose: TOAST_CONSTANT.autoClose,
            theme: TOAST_CONSTANT.theme,
          });
        }
      } catch (error) {
        toast.error('🦄 Some Error Occurred!', {
          position: TOAST_CONSTANT.position,
          autoClose: TOAST_CONSTANT.autoClose,
          theme: TOAST_CONSTANT.theme,
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

        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Temprary Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={tempPass} minLength="5" onChange={(e) => setTempPass(e.target.value)} />

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

export default ResetPassword