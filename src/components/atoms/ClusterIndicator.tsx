import React from 'react'

const ClusterIndicator = ({ cluster }) => {
  return (
    <foreignObject className="cluster-icon" width="20" height="20">
      <div className="relative grid place-content-center group">
        <span className="absolute font-bold text-mørk translate-x-1/2 text-medium -translate-y-1/2 top-1/2 right-1/2">
          {cluster.pins.length}
        </span>
        <svg
          className="transition-all ease-in-out group-hover:text-signal-pink text-lys"
          width="80"
          height="80"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 0C32 0 28.3573 25.9739 0 32C28.3573 38.026 32 64 32 64C32 64 35.6427 38.026 64 32C35.6427 25.9739 32 0 32 0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </foreignObject>
  )
}

export default ClusterIndicator
