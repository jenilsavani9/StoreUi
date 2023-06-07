import React from 'react'

function FormError({ message }) {
  return (
    <div class="invalid-feedback">{message}</div>
  )
}

export default FormError