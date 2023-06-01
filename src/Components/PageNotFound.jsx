import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
    return (
        <div className='d-flex flex-column align-items-center'>
            <h1 id='page-not-found-header'><span>4</span><span>0</span><span>4</span></h1>
            <h1>Page Not Found !</h1>
            <button className="btn btn-dark mt-5"><Link to="/login" className='text-decoration-none text-white'>Go to Login Page</Link></button>
        </div>
    )
}

export default PageNotFound