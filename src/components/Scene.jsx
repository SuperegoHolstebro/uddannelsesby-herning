'use client'
import React, { useEffect, useRef, useState } from 'react'
import useWindow from './useWindow'
import Image from 'next/image'

export default function Scene() {
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

  const init = () => {
    const ctx = canvas.current.getContext('2d')
    ctx.fillStyle = '#262723'
    ctx.fillRect(0, 0, dimension.width, dimension.height)
    ctx.globalCompositeOperation = 'destination-out'

    // Save that the animation has been shown
    localStorage.setItem('hasAnimated', 'true')
  }

  const lerp = (x, y, a) => x * (1 - a) + y * a

  const manageMouseMove = (e) => {
    if (hasAnimated) return

    const { clientX, clientY, movementX, movementY } = e
    const nbOfCircles = Math.max(Math.abs(movementX), Math.abs(movementY)) / 10

    if (prevPosition.current != null) {
      const { x, y } = prevPosition.current
      for (let i = 0; i < nbOfCircles; i++) {
        const targetX = lerp(x, clientX, (1 / nbOfCircles) * i)
        const targetY = lerp(y, clientY, (1 / nbOfCircles) * i)
        draw(targetX, targetY, 150)
      }
    }

    prevPosition.current = {
      x: clientX,
      y: clientY,
    }
  }

  const draw = (x, y, radius) => {
    const ctx = canvas.current.getContext('2d')
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fill()
  }

  return (
    <div className="relative w-full h-full z-[5]">
      {dimension.width == 0 && (
        <div className="absolute w-full h-full bg-mørk" />
      )}
      {!hasAnimated && (
        <canvas
          ref={canvas}
          onMouseMove={manageMouseMove}
          height={dimension.height}
          width={dimension.width}
        />
      )}
    </div>
  )
}
