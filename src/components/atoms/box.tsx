import React from 'react'

const Box = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-start space-y-5">
      {children}
    </div>
  )
}

export default Box
