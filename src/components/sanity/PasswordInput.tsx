// /components/PasswordInput.tsx
import React, { useState } from 'react'
import bcrypt from 'bcryptjs'
import { set, unset } from 'sanity'

type PasswordInputProps = {
  onChange: (value: any) => void
}

const PasswordInputComponent = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>((props: PasswordInputProps, ref) => {
  const [password, setPassword] = useState('')

  const handlePasswordChange = (event) => {
    const plainPassword = event.target.value
    setPassword(plainPassword)

    // Generate salt and hash the password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(plainPassword, salt)

    // Trigger the onChange handler passed by Sanity to store the hashed value
    if (!plainPassword) {
      props.onChange(unset())
    } else {
      props.onChange(set(hashedPassword))
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

export default PasswordInputComponent
