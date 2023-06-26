import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import "../App.css";
import ResetPassword from '../components/ui/User/ResetPassword';
import swal from 'sweetalert2';
import { ValidateUserEmailService } from '../services/User';
import ForgotPassword from '../components/ui/User/ForgotPassword';

function EmailValidation() {

    const nav = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [userId, setUserId] = useState(searchParams.get("UserId"));
    const [validateToken, setValidateToken] = useState(searchParams.get("token"));

    const [validateResponse, setValidateResponse] = useState(false);

    const [sendEmailToResetPass, setSendEmailToResetPass] = useState("");

    const [isResetPassword, setIsResetPassword] = useState(false);

    useEffect(() => {
        setUserId(searchParams.get("UserId"))
        setValidateToken(searchParams.get("token"))
    }, [])

    useEffect(() => {
        ValidateEmailRequest();
    }, [userId, validateToken])

    async function ValidateEmailRequest() {
        try {
            const response = await ValidateUserEmailService(userId, validateToken)

            if (response.data.status != 200) {
                setValidateResponse(false)
                swal.fire({
                    title: 'Error!',
                    text: "Link is not valid",
                    icon: 'error',
                    confirmButtonText: 'Cool'
                }).then(() => {
                    nav('/login');
                })
            } else {
                setValidateResponse(true)
                setSendEmailToResetPass(response.data.payload.email)
                if (response.data.payload.status == "pending") {
                    setIsResetPassword(true)
                    // IsResetPassword = <ResetPassword email={sendEmailToResetPass} />
                } else {
                    setIsResetPassword(false)
                    // IsResetPassword = <ResetPassword email={sendEmailToResetPass} />
                }
            }
        } catch (error) {
            swal.fire({
                title: 'Error!',
                text: "Link is not valid",
                icon: 'error',
                confirmButtonText: 'Cool'
            }).then(() => {
                console.log(error)
                // nav('/login');
            })
        }
    }

    return (

        <div className='d-flex flex-column align-items-center mt-5'>
            {validateResponse ?
                <>
                    {sendEmailToResetPass != "" ? <ResetPassword email={sendEmailToResetPass} /> : <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
                </> :

                <>

                </>

            }

        </div>
    )
}

export default EmailValidation