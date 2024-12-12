import React, { useState, useEffect } from 'react'
import bcrypt from 'bcryptjs'
import { set, unset } from 'sanity'

type PasswordInputProps = {
  onChange: (value: any) => void
  value?: string // Accept an initial value prop
}

const PasswordInputComponent = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ onChange, value = '' }, ref) => {
  const [password, setPassword] = useState('')

  // Initialize the state with the value prop
  useEffect(() => {
    setPassword(value)
  }, [value])

  const handlePasswordChange = (event) => {
    const plainPassword = event.target.value
    setPassword(plainPassword)

    // Generate salt and hash the password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(plainPassword, salt)

    // Trigger the onChange handler passed by Sanity to store the hashed value
    if (!plainPassword) {
      onChange(unset())
    } else {
      onChange(set(hashedPassword))
    }
  }

  return (
    <div>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={handlePasswordChange}
        ref={ref}
      />
    </div>
  )
})

PasswordInputComponent.displayName = 'PasswordInputComponent'

export default PasswordInputComponent
