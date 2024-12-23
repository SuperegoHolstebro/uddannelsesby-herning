'use client'
import React, { useEffect, useRef, useState } from 'react'
import useWindow from '../hooks/useWindow'

export default function Scene({ type }) {
  const { dimension } = useWindow()
  const canvas = useRef(null)
  const prevPosition = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    // Check if the animation has already been shown
    const hasBeenShown = localStorage.getItem('hasAnimated')

    if (!hasBeenShown) {
      // Initialize animation if it hasn't been shown
      setHasAnimated(false)
    } else {
      // Skip animation if it has been shown
      setHasAnimated(true)
    }

    if (dimension.width > 0 && !hasAnimated) {
      init()
    }
  }, [dimension, hasAnimated])

  let color
  if (type === 'regular') {
    color = '#262723'
  } else if (type === 'openHouse') {
    color = '#FFD4F3'
  } else {
    color = '#262723'
  }
  let bg
  if (type === 'regular') {
    bg = 'bg-mørk'
  } else if (type === 'openHouse') {
    bg = 'bg-signal-pink'
  } else {
    bg = 'bg-mørk'
  }

  const init = () => {
    const ctx = canvas.current.getContext('2d')
    ctx.fillStyle = color
    ctx.fillRect(0, 0, dimension.width, dimension.height)
    ctx.globalCompositeOperation = 'destination-out'
    // Save that the animation has been shown
    localStorage.setItem('hasAnimated', 'true')
  }

  const lerp = (x, y, a) => x * (1 - a) + y * a

  const manageMouseMove = (e) => {
    if (hasAnimated) return

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
      {dimension.width == 0 && (
        <div className={`absolute w-full h-screen ${bg}`} />
      )}
      {!hasAnimated && (
        <canvas
          className="w-full h-screen"
          ref={canvas}
          onMouseMove={manageMouseMove}
          height={dimension.height}
          width={dimension.width}
        />
      )}
      <div className="absolute inset-0 z-[2] pointer-events-none w-full h-screen bg-gradient-to-b from-transparent via-transparent to-mørk/40" />
    </>
  )
}
