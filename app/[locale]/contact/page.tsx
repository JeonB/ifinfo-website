'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  return (
    <div>
      <h1>Contact Us</h1>
    </div>
  )
}
