'use client'
import dynamic from 'next/dynamic'
import React from 'react'
/* import { Player } from '@lottiefiles/react-lottie-player'
 */
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  {
    ssr: false,
  },
)


/**
 *
 * @returns: En ikon-komponent, der viser et ikon.
 * @example: <Symbol type="facebook" />
 * @alias: Symbol
 * @module: components/atoms/Symbols
 * @summary: Denne komponent bruges til at vise et ikon.
 * @see: src/components/atoms/Symbols.tsx
 * @version: 1.0.0
 * @property: [type]
 * @author: Kasper Buchholtz
 *
**/

type SymbolProps = {
  type: 'f' | 'r' | 'g' | 't' | 'd' | any
  [key: string]: React.SVGProps<SVGSVGElement> | string
}

const Symbol: React.FC<SymbolProps> = ({ type, ...props }) => {
  const symbols: { [key: string]: React.ReactNode } = {
    f: (
      <svg
        {...props}
        width="137"
        height="194"
        viewBox="0 0 137 194"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.5672 57.4274C24.5672 75.9246 40.0987 90.9731 59.1898 90.9731H136.404V114.776H59.1898C40.0987 114.776 24.5672 129.825 24.5672 148.322V193.467H0V148.322C0 129.834 9.08288 113.367 23.151 102.875C9.09232 92.3819 0 75.9155 0 57.4274C0 25.8027 26.55 0.0784912 59.1898 0.0784912H136.404V23.8816H59.1898C40.0987 23.8816 24.5672 38.9301 24.5672 57.4274Z"
          fill="#D9FC00"
        />
      </svg>
    ),
    r: (
      <span {...props} >
        <Player
          autoplay
          speed={.5}
          src="/lottie/R/R-ny.json"
        ></Player>
      </span>
    ),
    g: (
      <svg
        {...props}
        width="134"
        height="200"
        viewBox="0 0 134 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M133.083 66.5461V199.61H0V166.299H99.7813V124.151C89.9901 129.825 78.6505 133.083 66.5461 133.083C29.8551 133.083 0.00945105 103.237 0.00945105 66.5461C0.00945105 29.8551 29.8551 0 66.5461 0C103.237 0 133.092 29.8457 133.092 66.5461H133.083ZM99.7813 120.591V105.739C90.8116 113.359 79.2076 117.966 66.5461 117.966C38.1922 117.966 15.1164 94.8905 15.1164 66.5461C15.1164 38.2017 38.1922 15.1258 66.5461 15.1258C94.8999 15.1258 117.976 38.1923 117.976 66.5461V103.681C125.539 93.2287 130.024 80.3973 130.024 66.5461C130.024 31.5452 101.556 3.07805 66.5555 3.07805C31.5546 3.07805 3.08747 31.5452 3.08747 66.5461C3.08747 101.547 31.564 130.014 66.5555 130.014C78.7354 130.014 90.1223 126.558 99.7907 120.591H99.7813ZM3.0686 169.368V181.415H112.717L100.669 169.368H3.05914H3.0686ZM3.0686 196.532H127.842L115.795 184.484H3.0686V196.532ZM102.85 66.5461V98.4311C110.337 89.9146 114.898 78.7544 114.898 66.5461C114.898 39.8823 93.2098 18.1944 66.5461 18.1944C39.8823 18.1944 18.1944 39.8823 18.1944 66.5461C18.1944 93.2098 39.8823 114.898 66.5461 114.898C79.4153 114.898 91.1042 109.837 99.7813 101.622V81.1431C94.154 93.9179 81.3792 102.859 66.5461 102.859C46.5294 102.859 30.2422 86.5722 30.2422 66.5555C30.2422 46.5388 46.5294 30.2517 66.5461 30.2517C86.5627 30.2517 102.85 46.5388 102.85 66.5555V66.5461ZM66.5461 33.3108C48.2195 33.3108 33.3108 48.2195 33.3108 66.5461C33.3108 84.8727 48.2195 99.7814 66.5461 99.7814C84.8727 99.7814 99.7813 84.8727 99.7813 66.5461C99.7813 48.2195 84.8727 33.3108 66.5461 33.3108ZM102.85 102.925V118.561C107.316 115.426 111.366 111.744 114.898 107.59V84.0418C112.292 91.2081 108.147 97.638 102.85 102.925ZM102.85 122.262V167.196L114.898 179.244V112.188C111.3 116.002 107.259 119.383 102.85 122.262ZM130.014 86.5344C127.427 94.7205 123.301 102.236 117.966 108.723V182.312L130.014 194.36V86.525V86.5344Z"
          fill="#D9FC00"
        />
      </svg>
    ),
    tlys: (
      <>
        {/*         <Player
          //@ts-ignore
          autoplay={true}
          loop
          hover
          src="/lottie/T/T.json"
          className="bg-cover "
        ></Player> */}

        <svg
          {...props}
          width="169"
          height="200"
          viewBox="0 0 169 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M65.0331 36.6955H1.65083V1.65083H166.762V36.6955H65.0331Z"
            stroke="#F5F5EB"
            strokeWidth="3.30165"
          />
          <path
            d="M66.7404 77.2209L66.7404 1.65082L102.115 1.65083L102.115 198.324L66.7404 198.324L66.7404 77.2209Z"
            stroke="#F5F5EB"
            strokeWidth="3.30165"
          />
          <defs></defs>
        </svg>
      </>
    ),
    t: (
      <span {...props} >
      <Player
        autoplay
        loop
        src="/lottie/T/T.json"
      ></Player>
    </span>

    ),
    d: (
      <svg
        {...props}
        width="155"
        height="201"
        viewBox="0 0 155 201"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M53.9487 200.4H0V0H53.9582C109.3 0 154.158 44.8578 154.158 100.2C154.158 155.542 109.3 200.4 53.9582 200.4H53.9487Z"
          fill="#D9FC00"
        />
      </svg>
    ),
    e: (
      <span {...props} >
        <Player
          autoplay
          loop
          src="/lottie/E/E-streger.json"
        ></Player>
      </span>
    ),
    i:(
      <span {...props} >
        <Player
          autoplay
          loop
          src="/lottie/I/i-uptimized.json"
        ></Player>
      </span>
    ),
    o:(
      <span {...props} >
        <Player
          autoplay
          loop
          src="/lottie/O/O.json"
        ></Player>
      </span>
    ),
    s:(
      <span {...props} >
        <Player
          autoplay
          loop
          src="/lottie/S/S-1.json"
        ></Player>
      </span>
    ),
  }

  const symbol = symbols[type]

  if (!symbol) {
    console.warn(`Symbol '${type}' not found.`)
    return null
  }

  return <>{symbol}</>
}

export default Symbol
