import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import "../App.css";


function EmailValidation() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [userId, setUserId] = useState("");
    const [validateToken, setValidateToken] = useState("");

    const [validateResponse, setValidateResponse] = useState(false);

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
                url: `https://localhost:44372/api/Login/validate?UserId=${userId}&token=${validateToken}`
            })
            console.log(response)
            if(response.data == "Link Is not valid") {
                setValidateResponse(false)
            } else {
                setValidateResponse(true)
            }
            
        } catch (error) {
            
        }
        
        
    }

    console.log(userId, validateToken);

    return (
        
        <div className='d-flex flex-column align-items-center mt-5'>
            {validateResponse ? 
                <><svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="green" class="bi bi-envelope-check-fill" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 4.697v4.974A4.491 4.491 0 0 0 12.5 8a4.49 4.49 0 0 0-1.965.45l-.338-.207L16 4.697Z" />
                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                </svg>
                <h2>Email Verification Done</h2>
                <button className="btn btn-dark"><Link to="/" className='text-decoration-none text-white'>Go to Login Page</Link></button></> : 
                
                <><svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="red" class="bi bi-envelope-check-fill" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 4.697v4.974A4.491 4.491 0 0 0 12.5 8a4.49 4.49 0 0 0-1.965.45l-.338-.207L16 4.697Z" />
                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                </svg>
                <h2 className='mt-5'>Email Verification Link Is not valid</h2>
                <button className="btn btn-dark mt-5"><Link to="/" className='text-decoration-none text-white'>Go to Login Page</Link></button></>
            
                }
            
        </div>
    )
}

export default EmailValidation