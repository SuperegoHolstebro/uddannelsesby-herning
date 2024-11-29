'use client'
import Section from './Section'
import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import Icon from '../atoms/Icons'

const Map = ({ data }) => {
  // console.log('Data:', data)
  return (
    <Section id="map-section">
      <div className="col-span-full">
        <SvgMap pins={data.mapArrayField} />
      </div>
    </Section>
  )
}

export default Map

const SvgMap = ({ pins }) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const zoomRef = useRef(null) // Store D3 zoom instance
  const [clusters, setClusters] = React.useState([]) // Store clustered data
  const zoomLevel = useRef(1) // Track current zoom level

  // Group pins into clusters based on zoom level
  const clusterPins = (pins, zoom) => {
    const threshold = 50 / zoom // Adjust threshold dynamically based on zoom level
    const clusters = []

    pins.forEach((pin) => {
      let addedToCluster = false

      for (const cluster of clusters) {
        const dx = cluster.x - pin.x
        const dy = cluster.y - pin.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < threshold) {
          cluster.pins.push(pin)
          cluster.x =
            (cluster.x * cluster.pins.length + pin.x) /
            (cluster.pins.length + 1)
          cluster.y =
            (cluster.y * cluster.pins.length + pin.y) /
            (cluster.pins.length + 1)
          addedToCluster = true
          break
        }
      }

      if (!addedToCluster) {
        clusters.push({ x: pin.x, y: pin.y, pins: [pin] })
      }
    })

    return clusters
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    // Initialize D3 zoom
    const zoom = d3
      .zoom()
      .scaleExtent([1, 5]) // Set min and max zoom levels
      .on('zoom', (event) => {
        zoomLevel.current = event.transform.k // Update zoom level
        setClusters(clusterPins(pins, zoomLevel.current)) // Recluster pins based on zoom level
        svg.select('g').attr('transform', event.transform) // Apply zoom
      })

    svg.call(zoom)
    zoomRef.current = zoom // Store zoom instance for programmatic access

    // Initial clustering
    setClusters(clusterPins(pins, zoomLevel.current))

    return () => {
      svg.on('.zoom', null) // Cleanup on unmount
    }
  }, [pins])

  // Function to zoom to a specific cluster
  const zoomToCluster = (cluster) => {
    const svg = d3.select(svgRef.current)
    const [svgWidth, svgHeight] = [
      svgRef.current.clientWidth,
      svgRef.current.clientHeight,
    ]

    const zoomScale = Math.max(zoomLevel.current * 2, 2) // Adjust zoom level (ensure it's at least 2)
    const xOffset = svgWidth / 2 - cluster.x * zoomScale
    const yOffset = svgHeight / 2 - cluster.y * zoomScale

    const transform = d3.zoomIdentity
      .translate(xOffset, yOffset)
      .scale(zoomScale)

    svg
      .transition()
      .duration(500) // Smooth transition
      .call(zoomRef.current.transform, transform) // Apply zoom programmatically
  }

  return (
    <svg
      className="map"
      ref={svgRef}
      style={{
        border: '1px solid black',
        width: '100%',
        height: '100%',
        background: '#4a494a',
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 1080"
    >
      <g>
        {/* SVG Background */}
        <image href="/7400-kort.svg" x="0" y="0" width="1920" height="1080" />

        {/* Render Clusters */}
        {clusters.map((cluster, index) => (
          <g
            key={index}
            transform={`translate(${cluster.x}, ${cluster.y})`}
            onClick={() => zoomToCluster(cluster)} // Zoom to this cluster on click
            style={{ cursor: 'pointer' }}
          >
            {cluster.pins.length === 1 ? (
              // Single Pin
              <foreignObject
                style={{ overflow: 'visible' }}
                width="50"
                height="50"
                className="overflow-[initial]"
              >
                <div className="grid p-3 transition-all duration-200 ease-in-out rounded-full hover:z-10 group hover:bg-signal-pink bg-lys size-12 aspect-1 place-content-center">
                  <Icon
                    type={cluster.pins[0].icon.patches[0].value}
                    className="w-full h-full"
                  />
                  <div className="absolute invisible transition-all duration-200 ease-in-out translate-x-1/2 translate-y-1/2 rounded-md opacity-0 group-hover:opacity-100 group-hover:visible group-hover:bg-signal-pink -bottom-1/2 right-1/2 w-max">
                    <p className="p-2 text-center">{cluster.pins[0].title}</p>
                  </div>
                </div>
              </foreignObject>
            ) : (
              // Cluster with Multiple Pins
              <foreignObject width="65" height="65">
                <div className="relative grid place-content-center group">
                  <span className="absolute font-bold text-mørk translate-x-1/2 -translate-y-1/2 top-1/2 right-1/2">
                    {cluster.pins.length}
                  </span>
                  <svg
                    className="group-hover:text-signal-pink text-lys"
                    width="64"
                    height="64"
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
            )}
          </g>
        ))}
      </g>
    </svg>
  )
}
