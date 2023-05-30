import React from 'react'
import { Link } from "react-router-dom";

function Services() {
  return (
    <div>
        <div>Services</div>
        <Link to="/">Store</Link>
        <Link to="/Users">Users</Link>
    </div>
  )
}

export default Services