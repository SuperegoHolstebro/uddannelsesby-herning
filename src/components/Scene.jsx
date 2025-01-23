'use client'
import React, { useEffect, useRef, useState } from 'react'
import useWindow from '../hooks/useWindow'
import { clean } from '~/utils/sanitize'

export default function Scene({ type }) {
  const { dimension } = useWindow()
  const canvas = useRef(null)
  const prevPosition = useRef(null)

  useEffect(() => {
    if (dimension.width > 0) {
      init()
    }
  }, [dimension])

  const init = () => {
    const ctx = canvas.current.getContext('2d')

    // Set the fill style based on the `type` prop
    switch (type) {
      case 'openHouse':
        ctx.fillStyle = '#FED7F4'
        break
      case 'default': // You can define more cases for other types
        ctx.fillStyle = '#262723'
        break
      default:
        ctx.fillStyle = '#262723' // Fallback color
    }

    ctx.fillRect(0, 0, dimension.width, dimension.height)
    ctx.globalCompositeOperation = 'destination-out'
  }

  const lerp = (x, y, a) => x * (1 - a) + y * a

  const manageMouseMove = (e) => {
    // Get the scroll offsets
    const scrollX = window.scrollX || window.pageXOffset
    const scrollY = window.scrollY || window.pageYOffset

    // Adjust the mouse position based on the scroll offset
    const { clientX, clientY, movementX, movementY } = e
    const mouseX = clientX + scrollX
    const mouseY = clientY + scrollY

    const nbOfCircles = Math.max(Math.abs(movementX), Math.abs(movementY)) / 10

    if (prevPosition.current != null) {
      const { x, y } = prevPosition.current
      for (let i = 0; i < nbOfCircles; i++) {
        const targetX = lerp(x, mouseX, (1 / nbOfCircles) * i)
        const targetY = lerp(y, mouseY, (1 / nbOfCircles) * i)
        draw(targetX, targetY, 150)
      }
    }

    prevPosition.current = {
      x: mouseX + movementX,
      y: mouseY + movementY,
    }
  }

  const draw = (x, y, radius) => {
    const ctx = canvas.current.getContext('2d')
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fill()
  }

  return (
    <>
      <div className="absolute inset-0 overflow-hidden w-full h-screen z-[5]">
        {dimension.width == 0 && <div className={`w-full h-full bg-mørk`} />}
        <canvas
          className="hidden h-screen md:block"
          ref={canvas}
          onMouseMove={manageMouseMove}
          height={dimension.height}
          width={dimension.width}
        />

        {clean(type) !== 'openHouse' && (
          <div
            className="absolute inset-0 z-0 w-full h-screen pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(45, 45, 45, 0.00) 50%, rgba(45, 45, 45, 0.35) 87.5%, rgba(45, 45, 45, 0.50) 100%), linear-gradient(0deg, rgba(199, 201, 194, 0.25) 0%, rgba(199, 201, 194, 0.25) 100%)',
            }}
          />
        )}

        {clean(type) === 'openHouse' && (
          <div
            className="absolute inset-0 z-0 w-full h-screen pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 50%, rgba(255, 255, 255, 0.35) 87.5%, rgba(255, 255, 255, 0.50) 100%), linear-gradient(0deg, rgba(199, 201, 194, 0.25) 0%, rgba(199, 201, 194, 0.25) 100%)',
            }}
          />
        )}
      </div>
    </>
  )
}
