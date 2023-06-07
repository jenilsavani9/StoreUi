import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import "../App.css";
import ResetPassword from '../components/ui/User/ResetPassword';
import swal from 'sweetalert2';
import { BASE_URL } from '../constants/regex';

function EmailValidation() {

    const nav = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [userId, setUserId] = useState("");
    const [validateToken, setValidateToken] = useState("");

    const [validateResponse, setValidateResponse] = useState(false);

    const [sendEmailToResetPass, setSendEmailToResetPass] = useState("");

    useEffect(() => {
        setUserId(searchParams.get("UserId"))
        setValidateToken(searchParams.get("token"))
    }, [])

    useEffect(() => {
        ValidateEmailRequest();
    }, [userId, validateToken])




    async function ValidateEmailRequest() {
        try {
            const response = await axios({
                method: 'get',
                url: `/api/Login/validate?UserId=${userId}&token=${validateToken}`
            })
            console.log(response)
            if (response.data.message == false) {
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
                setSendEmailToResetPass(response.data.user[0].email)
            }

        } catch (error) {

        }


    }

    console.log(userId, validateToken);

    return (

        <div className='d-flex flex-column align-items-center mt-5'>
            {validateResponse ?
                <>
                    {sendEmailToResetPass != "" ? <ResetPassword email={sendEmailToResetPass} /> : <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>}
                </> :

                <>

                </>

            }

        </div>
    )
}

export default EmailValidation