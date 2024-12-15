import React from 'react'
import Icon from './Icons'

const MapPin = ({ cluster }) => {
  return (
    <foreignObject
      className="pin"
      width="74"
      height="74"
      style={{ overflow: 'visible' }}
    >
      <div className="grid p-3 transition-all duration-500 rounded-full ease-custom hover:z-10 group hover:bg-signal-pink bg-lys size-19 aspect-1 place-content-center">
        <Icon
          type={cluster.pins[0].category?.icon || 'default-icon'} // Fallback icon
          className="w-[2.5rem] h-[2.5rem]"
        />
        <div className="absolute invisible transition-all duration-500 translate-x-1/2 translate-y-1/2 rounded-md opacity-0 ease-custom right-1/2 group-hover:opacity-100 group-hover:visible group-hover:bg-signal-pink -bottom-1/2 w-max">
          <p className="p-2 text-center">
            {cluster.pins[0].title || 'Untitled'}
          </p>
        </div>
      </div>
    </foreignObject>
  )
}

export default MapPin
