import React from 'react'
import { Link } from "react-router-dom";

function Users() {
  return (
    <div>
        <div>Users</div>
        <Link to="/">Store</Link>
        <Link to="/services">Services</Link>
        
    </div>
  )
}

export default Users