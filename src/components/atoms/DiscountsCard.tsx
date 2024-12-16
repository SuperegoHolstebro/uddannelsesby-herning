import React from 'react'

const DiscountsCard = ({ data }) => {
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>Hello from DiscountsCard
    </div>
  )
}

export default DiscountsCard
