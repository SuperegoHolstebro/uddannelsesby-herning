import React from 'react'
import Photo from './Photo'
import Heading from './Heading'
import Paragraph from './Paragraph'
import Link from 'next/link'

const DiscountsCard = ({ data, locale }) => {
  const isDanishLocale = locale === 'da'
  return (
    <div className="relative col-span-full sm:col-span-4 xl:col-span-8 group border-b-grå border-b pb-6 mb-6">
      {data.url && (
        <Link
          title={data.title}
          className="absolute inset-0 z-10 size-full"
          href={data.url}
          target="_blank"
        ></Link>
      )}
      {/* Image */}
      <div className="overflow-hidden">
        {data?.mainImage ? (
          <div className="overflow-hidden transition-all aspect-w-5 aspect-h-3 ease-custom duration-735 group-hover:scale-110">
            <Photo className="" image={data.mainImage} objectFit="cover" />
          </div>
        ) : (
          <div className="overflow-hidden aspect-w-5 aspect-h-3">
            <div>
              <svg
                className="w-auto h-full transition-all duration-735 ease-custom group-hover:scale-110"
                width="528"
                height="280"
                viewBox="0 0 528 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1016_4135)">
                  <rect width="528" height="280" fill="#262723" />
                  <path
                    opacity="0.8"
                    d="M569.305 115.265C567.325 110.285 564.719 105.245 559.463 101.06C545.272 89.7638 515.509 88.3212 494.137 94.1471C472.766 99.9729 457.827 111.158 443.68 121.964C458.58 108.012 473.784 93.5819 477.982 77.2544C482.177 60.9308 472.632 42.05 447.652 33.1729C420.832 23.6436 386.236 28.3707 358.659 36.1412C316.542 48.0103 280.335 66.3535 254.737 88.7955C257.05 70.8435 272.223 54.6425 284.62 38.2755C301.702 15.715 314.95 -15.0586 275.107 -33.6864C242.472 -48.9468 209.373 -32.8367 178.734 -24.2125C106.28 -3.81791 43.7109 27.3707 -1.99002 65.2864C-27.4525 86.4082 -47.6949 109.656 -61.4222 134.237C-67.6007 145.299 -72.5751 156.888 -70.5355 168.587C-68.4918 180.282 -58.333 192.203 -40.4075 198.219C-13.3489 207.301 20.5812 200.471 46.7011 191.444C84.9799 178.215 118.292 160.473 144.143 139.636C120.478 161.208 103.107 185.1 93.0199 210.092C88.3385 221.688 86.0572 235.344 100.058 244.517C118.645 256.695 152.963 253.003 177.039 245.45C221.639 231.455 256.171 207.641 272.085 179.895C265.657 207.036 239.636 230.882 224.756 256.766C209.88 282.654 209.033 315.12 244.666 334.249C275.301 350.696 323.944 351.328 361.237 341.751C398.53 332.174 426.812 314.341 452.876 296.444C490.007 270.951 525.2 244.071 548.465 213.542C571.729 183.014 582.454 148.331 569.305 115.265Z"
                    fill="#F4F4E9"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1016_4135">
                    <rect width="528" height="280" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        )}
      </div>
      {/* content */}
      <div className="relative flex gap-6 pt-6">
        <div className="w-full">
          <Heading spacing="none" tag="h5" type="h5">
            {isDanishLocale ? data.title : data?.titleEnglish}
          </Heading>
          <Paragraph spacing="none">
            {isDanishLocale ? data.discount : data?.discountEnglish}
          </Paragraph>
        </div>
        <div className="w-1/5">
          {data.url && (
            <svg
              className="absolute -translate-y-1/2 bottom-1/2 right-4"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_980_1434)">
                <path
                  d="M9 3.75H1.5V16.5H14.25V9"
                  stroke="#262723"
                  strokeWidth="1.5"
                />
                <path
                  d="M7.5 10.5L16.5 1.5"
                  stroke="#262723"
                  strokeWidth="1.5"
                />
                <path
                  d="M10.5 1.5H16.5V7.5"
                  stroke="#262723"
                  strokeWidth="1.5"
                />
              </g>
              <defs>
                <clipPath id="clip0_980_1434">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}

export default DiscountsCard
