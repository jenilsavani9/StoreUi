import React from 'react'

function FormError({ message }) {
  return (
    <div className="invalid-feedback">{message}</div>
  )
}

export default FormError