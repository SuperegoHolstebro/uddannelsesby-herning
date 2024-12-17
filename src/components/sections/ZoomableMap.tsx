'use client'
import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import ClusterIndicator from '../atoms/ClusterIndicator'
import MapPin from '../atoms/MapPin'

export const ZoomableMap = ({ pins }) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const zoomRef = useRef(null)
  const [clusters, setClusters] = React.useState([])
  const zoomLevel = useRef(1)

  const svgWidth = 1920
  const svgHeight = 1080

  // Convert percentage-based pins to absolute positions
  const convertToAbsolute = (pins) =>
    pins.map((pin) => ({
      ...pin,
      absX: (pin.x / 100) * svgWidth,
      absY: (pin.y / 100) * svgHeight,
    }))

  // Group pins into clusters based on zoom level
  const clusterPins = (pins, zoom) => {
    const threshold = 50 / zoom
    const clusters = []

    pins.forEach((pin) => {
      let addedToCluster = false

      for (const cluster of clusters) {
        const dx = cluster.absX - pin.absX
        const dy = cluster.absY - pin.absY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < threshold) {
          cluster.pins.push(pin)
          cluster.absX =
            (cluster.absX * cluster.pins.length + pin.absX) /
            (cluster.pins.length + 1)
          cluster.absY =
            (cluster.absY * cluster.pins.length + pin.absY) /
            (cluster.pins.length + 1)
          addedToCluster = true
          break
        }
      }

      if (!addedToCluster) {
        clusters.push({ absX: pin.absX, absY: pin.absY, pins: [pin] })
      }
    })

    return clusters
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    // Initialize D3 zoom
    const zoom = d3
      .zoom()
      .scaleExtent([1, 5])
      .translateExtent([
        [0, 0],
        [svgWidth, svgHeight],
      ])
      .on('zoom', (event) => {
        zoomLevel.current = event.transform.k
        setClusters(clusterPins(convertToAbsolute(pins), zoomLevel.current))

        svg.select('g').attr('transform', event.transform)

        svg
          .selectAll('.pin, .cluster-icon')
          .attr('transform', `scale(${1 / event.transform.k})`)
      })

    svg.call(zoom)
    zoomRef.current = zoom

    // Initial clustering
    setClusters(clusterPins(convertToAbsolute(pins), zoomLevel.current))

    return () => {
      svg.on('.zoom', null)
    }
  }, [pins])

  // Function to zoom to a specific cluster
  const zoomToCluster = (cluster) => {
    const svg = d3.select(svgRef.current)
    const [svgWidth, svgHeight] = [
      svgRef.current.clientWidth,
      svgRef.current.clientHeight,
    ]

    const zoomScale = Math.max(zoomLevel.current * 2, 2)
    const xOffset = svgWidth / 2 - cluster.absX * zoomScale
    const yOffset = svgHeight / 2 - cluster.absY * zoomScale

    const transform = d3.zoomIdentity
      .translate(xOffset, yOffset)
      .scale(zoomScale)

    svg.transition().duration(500).call(zoomRef.current.transform, transform)
  }

  return (
    <svg
      className="relative map"
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
        <image href="./7400-kort.svg" x="0" y="0" width="1920" height="1080" />

        {/* Render Clusters */}
        {clusters.map((cluster, index) => (
          <g
            key={index}
            transform={`translate(${cluster.absX}, ${cluster.absY})`}
            onClick={() => zoomToCluster(cluster)}
            style={{ cursor: 'pointer' }}
          >
            {cluster.pins.length === 1 ? (
              // Single Pin
              <MapPin cluster={cluster} />
            ) : (
              // Cluster with Multiple Pins
              <ClusterIndicator cluster={cluster} />
            )}
          </g>
        ))}
      </g>
    </svg>
  )
}
