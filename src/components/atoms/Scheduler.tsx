'use client'

import { useEffect, useState } from 'react'
import { AdvancedButton } from './AdvancedButton'

/**
 *
 * @returns: En Scheduler.
 * @example: <Scheduler start="2022-01-01T00:00:00Z" end="2022-01-01T00:00:00Z">hej</Scheduler>
 * @alias: TextContainer
 * @summary: Denne komponent bruges til at vise...
 * @version: 1.0.0
 * @property: [start, end, children]
 * @author: Emilie Hjøllund
 *
 **/

export default function Scheduler({
  start,
  end,
  children,
  hasText,
}: Partial<{
  start: string
  end: string
  children: React.ReactNode
  hasText: boolean
}>) {
  if (!start && !end) return children

  function checkActive() {
    const now = new Date()
    return (!start || new Date(start) < now) && (!end || new Date(end) > now)
  }

  const [isActive, setIsActive] = useState(checkActive())

  useEffect(() => {
    const interval = setInterval(() => setIsActive(checkActive()), 1000) // check every second
    return () => clearInterval(interval)
  }, [])

  if (!isActive) {
    return hasText ? (
      <AdvancedButton variant="primary">
        <span
        // href="#signup"
        >
          Tilmelding åbnes d. kl.
          <span className="overflow-hidden">
            <span
              className={`block w-10 overflow-hidden duration-500 ease-in-out group-hover/button:w-full`}
            >
              <svg
                className="w-full"
                preserveAspectRatio="xMinYMin meet"
                height="6"
                viewBox="0 0 30 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 4.71024L4.16667 2.85512C6.81894 1.67425 9.84772 1.67425 12.5 2.85512V2.85512C15.1523 4.03599 18.1811 4.03599 20.8333 2.85512V2.85512C23.4856 1.67425 26.5144 1.67425 29.1667 2.85512V2.85512C31.8189 4.03599 34.8477 4.03599 37.5 2.85512V2.85512C40.1523 1.67425 43.1811 1.67425 45.8333 2.85512V2.85512C48.4856 4.03599 51.5144 4.03599 54.1667 2.85512V2.85512C56.8189 1.67425 59.8477 1.67425 62.5 2.85512V2.85512C65.1523 4.03599 68.1811 4.03599 70.8333 2.85512V2.85512C73.4856 1.67425 76.5144 1.67425 79.1667 2.85512V2.85512C81.8189 4.03599 84.8477 4.03599 87.5 2.85512V2.85512C90.1523 1.67425 93.1811 1.67425 95.8333 2.85512V2.85512C98.4856 4.03599 101.514 4.03599 104.167 2.85512V2.85512C106.819 1.67425 109.848 1.67425 112.5 2.85512V2.85512C115.152 4.03599 118.181 4.03599 120.833 2.85512V2.85512C123.486 1.67425 126.514 1.67425 129.167 2.85512V2.85512C131.819 4.03599 134.848 4.03599 137.5 2.85512V2.85512C140.152 1.67425 143.181 1.67425 145.833 2.85512V2.85512C148.486 4.03599 151.514 4.03599 154.167 2.85512V2.85512C156.819 1.67425 159.848 1.67425 162.5 2.85512V2.85512C165.152 4.03599 168.181 4.03599 170.833 2.85512V2.85512C173.486 1.67425 176.514 1.67425 179.167 2.85512V2.85512C181.819 4.03599 184.848 4.03599 187.5 2.85512V2.85512C190.152 1.67425 193.181 1.67425 195.833 2.85512V2.85512C198.486 4.03599 201.514 4.03599 204.167 2.85512V2.85512C206.819 1.67425 209.848 1.67425 212.5 2.85512V2.85512C215.152 4.03599 218.181 4.03599 220.833 2.85512V2.85512C223.486 1.67425 226.514 1.67425 229.167 2.85512V2.85512C231.819 4.03599 234.848 4.03599 237.5 2.85512V2.85512C240.152 1.67425 243.181 1.67425 245.833 2.85512V2.85512C248.486 4.03599 251.514 4.03599 254.167 2.85512V2.85512C256.819 1.67425 259.848 1.67425 262.5 2.85512V2.85512C265.152 4.03599 268.181 4.03599 270.833 2.85512V2.85512C273.486 1.67425 276.514 1.67425 279.167 2.85512V2.85512C281.819 4.03599 284.848 4.03599 287.5 2.85512V2.85512C290.152 1.67425 293.181 1.67425 295.833 2.85511L300 4.71024"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>
          </span>
        </span>
      </AdvancedButton>
    ) : null
  }

  return children
}
