import React from 'react'

const ClusterIndicator = ({ cluster }) => {
  return (
    <g className="cluster-icon">
      <foreignObject
        x="-10" // Center the foreignObject relative to the cluster point
        y="-10"
        width="40"
        height="40"
      >
        <div className="relative grid w-full h-full place-content-center group">
          <span className="absolute font-bold text-mørk text-medium top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {cluster.pins.length}
          </span>
          <svg
            className="transition-all ease-in-out group-hover:text-signal-pink text-lys"
            width="40"
            height="40"
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
    </g>
  )
}

export default ClusterIndicator
