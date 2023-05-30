import React from 'react'
import { Link } from "react-router-dom";

function Store() {
  return (
    <div>
        <div>Store</div>
        <Link to="/services">Services</Link>
        <Link to="/Users">Users</Link>
    </div>
    
  )
}

export default Store