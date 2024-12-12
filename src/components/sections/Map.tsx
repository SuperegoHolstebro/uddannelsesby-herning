'use client'
import 'swiper/css/grid'
import Section from './Section'
import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import Icon from '../atoms/Icons'
import { useMediaQuery } from '~/hooks/useMediaQuery'
import Carousel from '../organisms/Carousel'

import { Grid, Pagination } from 'swiper/modules'

const Map = ({ data }) => {
  // console.log('Data:', data)
  // Deduplicate categories

  const uniqueCategories = data.categoriesInUse.filter(
    (category, index, self) =>
      index ===
      self.findIndex(
        (t) => t.title === category.title && t.icon === category.icon,
      ),
  )

  return (
    <Section id="map-section">
      <div className="col-span-full">
        <SvgMap pins={data.hotspots} />
      </div>
      {useMediaQuery('(max-width: 768px)') ? (
        <ul className="col-span-full">
          <Carousel
            grid={{
              rows: 3,
              fill: 'row',
            }}
            modules={[Grid]}
            centeredSlides={false}
            loop={false}
            hideNavigation
            breakpoints={{
              '0': {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              '428': {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              '768': {
                slidesPerView: 1,
                spaceBetween: 16,
              },
            }}
          >
            {uniqueCategories.map((category, index) => (
              <li key={index} className="flex w-full gap-6">
                <Icon className="size-8" type={category.icon} />
                {category.title}
              </li>
            ))}
          </Carousel>
        </ul>
      ) : (
        <ul className="grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 col-span-full">
          {uniqueCategories.map((category, index) => (
            <li
              key={index}
              className="flex w-full gap-6 border-r border-grå [&:nth-child(6)]:border-r-0 [&:nth-child(12)]:border-r-0 [&:nth-child(18)]:border-r-0 [&:nth-child(24)]:border-r-0 [&:nth-child(30)]:border-r-0"
            >
              <Icon className="size-8" type={category.icon} />
              {category.title}
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}

export default Map

const SvgMap = ({ pins }) => {
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
            transform={`translate(${cluster.absX}, ${cluster.absY})`}
            onClick={() => zoomToCluster(cluster)}
            style={{ cursor: 'pointer' }}
          >
            {cluster.pins.length === 1 ? (
              // Single Pin
              <foreignObject
                className="pin"
                width="74"
                height="74"
                style={{ overflow: 'visible' }}
              >
                <div className="grid p-3 transition-all duration-200 ease-in-out rounded-full hover:z-10 group hover:bg-signal-pink bg-lys size-19 aspect-1 place-content-center">
                  <Icon
                    type={cluster.pins[0].category?.icon || 'default-icon'} // Fallback icon
                    className="w-[2.5rem] h-[2.5rem]"
                  />
                  <div className="absolute invisible transition-all duration-300 ease-in-out translate-x-1/2 translate-y-1/2 rounded-md opacity-0 right-1/2 group-hover:opacity-100 group-hover:visible group-hover:bg-signal-pink -bottom-1/2 w-max">
                    <p className="p-2 text-center">
                      {cluster.pins[0].title || 'Untitled'}
                    </p>
                  </div>
                </div>
              </foreignObject>
            ) : (
              // Cluster with Multiple Pins
              <foreignObject className="cluster-icon" width="74" height="74">
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
            )}
          </g>
        ))}
      </g>
    </svg>
  )
}
