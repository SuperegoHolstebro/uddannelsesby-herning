'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import Icon from '../atoms/Icons'

/**
 * @returns: A media component that can display images, videos, or Vimeo videos, with optional popup functionality.
 * @example: <Media data={mediaData} popup={true} />
 * @alias: MediaComponent
 * @module: components/organisms/Media
 * @summary: This component is used to display media content such as images, videos, or Vimeo videos. It supports displaying media in a popup modal.
 * @see: src/components/organisms/Media.tsx
 * @version: 1.0.0
 * @property: [data] - The media data object containing image, video, or Vimeo information.
 * @property: [popup] - A boolean indicating whether to display the video in a popup modal.
 * @author: Kasper Buchholtz & Emilie Hjøllund
 **/

type MediaProps = {
  popup?: boolean
  data: {
    select: 'image' | 'video' | 'vimeo'
    videoObject: {
      video: {
        asset: {
          url: string
          altText: string
          description
          metadata: {
            dimensions: {
              width: number
              height: number
            }
          }
        }
      }
      thumbnail: {
        asset: {
          url: string
          altText: string
          description
          metadata: {
            blurHash: any
            dimensions: {
              width: number
              height: number
            }
          }
        }
      }
    }
    imageObject: {
      image: {
        asset: {
          url: string
          altText: string
          description
          metadata: {
            blurHash: any
            dimensions: {
              width: number
              height: number
            }
          }
        }
      }
    }
    vimeoObject: {
      vimeo: string
    }
  }
}

const Media = ({ data, popup }: MediaProps) => {
  const image = data?.imageObject?.image
  const videoObject = data?.videoObject
  const video = data?.videoObject?.video
  const thumbnail = data?.videoObject?.thumbnail
  const vimeoObject = data?.vimeoObject
  const [isPopupOpen, setIsPopupOpen] = React.useState(false)

  const handleButtonClick = () => {
    setIsPopupOpen(!isPopupOpen) // Toggle the value of isPopupOpen
  }
  return (
    <div className="relative w-full h-full max-w-full max-h-full shadow-md ">
      {image ? (
        <>
          <Media.MediaImage image={image} />
        </>
      ) : null}

      {videoObject && !popup ? (
        <>
          <figure>
            <PlayPause />
            <Image
              className="absolute inset-0 object-cover w-full h-full "
              src={thumbnail?.asset.url}
              alt={thumbnail?.asset.altText}
              width={thumbnail?.asset.metadata?.dimensions.width || 800}
              height={thumbnail?.asset.metadata?.dimensions.height || 600}
            />
            <video
              className="absolute inset-0 object-cover w-full h-full"
              autoPlay
              loop
              muted
              playsInline
              aria-label={video?.asset.description}
            >
              <source src={video?.asset.url} type="video/mp4" />
            </video>
            <figcaption className="sr-only">
              {video?.asset.description}
            </figcaption>
          </figure>
        </>
      ) : null}
      {/* Popup video */}
      {videoObject && popup ? (
        <>
          <div className="relative h-full overflow-hidden transition-all bg-red-500 group">
            <Image
              src={thumbnail?.asset.url}
              alt="image"
              className="object-cover h-full transition-transform duration-500 ease-in-out col-span-full group-hover:scale-110"
              width={thumbnail?.asset.metadata?.dimensions.width || 800}
              height={thumbnail?.asset.metadata?.dimensions.height || 600}
            />
            <button
              className="absolute translate-x-1/2 -translate-y-1/2 size-full top-1/2 right-1/2"
              onClick={handleButtonClick}
              aria-label={
                isPopupOpen ? 'Close video popup' : 'Open video popup'
              }
            >
              <svg
                className="m-auto transition-all bg-transparent rounded-full text-green group-hover:bg-green group-active:bg-transparent "
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Play button"
              >
                <rect
                  className="text-current"
                  x="2"
                  y="2"
                  width="96"
                  height="96"
                  rx="48"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="text-current transition-all group-hover:text-light-light group-active:text-green"
                  d="M69.245 48.2984C70.5104 49.0799 70.5104 50.9201 69.245 51.7016L41.051 69.1156C39.7185 69.9385 38 68.9801 38 67.414L38 32.586C38 31.0199 39.7185 30.0615 41.051 30.8844L69.245 48.2984Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <AnimatePresence mode="wait">
            {isPopupOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed z-[9999999999] grid w-full h-full translate-x-1/2 -translate-y-1/2 top-1/2 right-1/2 place-content-center"
              >
                <button
                  onClick={handleButtonClick}
                  className="absolute inset-0 size-full bg-dark/70"
                  aria-label="Close video"
                />
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-auto max-w-6xl mx-auto my-auto isolate"
                >
                  <video autoPlay loop className="w-full h-auto">
                    <source src={video?.asset.url} />
                    Your browser does not support the video tag.
                  </video>
                  <button
                    onClick={handleButtonClick}
                    className="absolute top-4 right-4"
                    aria-label="Close video"
                  >
                    <Icon className="fill-dark size-8" type="x" />
                    <span className="sr-only">luk</span>
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : null}

      {/*    { vimeoObject ? (
        <>
          <ReactPlayer
            width={'100%'}
            height={'100%'}
            className="object-cover aspect-w-16 aspect-h-9 "
            url="https://player.vimeo.com/video/862002008"
            controls={false}
            light={false} // light is usefull incase of dark mode
            pip={false} // picture in picture
            playing={true} // Add this line to enable autoplay
            loop={true} // loop the video
          />
          <source
            src="https://player.vimeo.com/video/862002008"
            type="video/mp4"
          />
        </>
      ) : null} */}
    </div>
  )
}

export default Media

const PlayPause = () => {
  const [isPaused, setIsPaused] = useState(false)

  const toggleVideo = () => {
    const video = document.querySelector('video')
    if (video) {
      if (video.paused) {
        video.play()
        setIsPaused(false)
      } else {
        video.pause()
        setIsPaused(true)
      }
    }
  }

  return (
    <button
      className="absolute bottom-4 right-4 z-[calc(infinity+1)]"
      onClick={toggleVideo}
      aria-label={isPaused ? 'Play video' : 'Pause video'}
    >
      {isPaused ? (
        <span className="inline-flex gap-3 text-light-light">
          Start video{' '}
          <svg
            className="my-auto"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Play icon"
          >
            <path
              d="M9 1.5C4.8525 1.5 1.5 4.8525 1.5 9C1.5 13.1475 4.8525 16.5 9 16.5C13.1475 16.5 16.5 13.1475 16.5 9C16.5 4.8525 13.1475 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z"
              fill="currentColor"
            ></path>
            <g clipPath="url(#clip0_810_871)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.26448 7.00574C8.18002 7.00565 8.09693 7.02709 8.02305 7.06802C7.94728 7.10664 7.88346 7.16515 7.83841 7.23727C7.79336 7.3094 7.76879 7.39243 7.76733 7.47745V10.5257V10.528C7.76879 10.613 7.79336 10.6961 7.83841 10.7682C7.88346 10.8403 7.94728 10.8988 8.02305 10.9375C8.09827 10.9792 8.18304 11.0008 8.26908 11C8.35512 10.9992 8.43948 10.9761 8.51391 10.9329L10.9796 9.40774C11.0557 9.36939 11.1197 9.31066 11.1643 9.2381C11.209 9.16554 11.2326 9.082 11.2326 8.99679C11.2326 8.91158 11.2089 8.82806 11.1642 8.75553C11.1194 8.683 11.0555 8.62432 10.9793 8.58602L8.51362 7.07231C8.43787 7.02859 8.35193 7.00563 8.26448 7.00574Z"
                fill="currentColor"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_810_871">
                <rect
                  width="4"
                  height="4"
                  fill="white"
                  transform="translate(7.5 7)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
        </span>
      ) : (
        <span className="inline-flex gap-3 text-light-light">
          Stop video{' '}
          <svg
            className="my-auto"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Pause icon"
          >
            <path
              d="M9 1.5C4.8525 1.5 1.5 4.8525 1.5 9C1.5 13.1475 4.8525 16.5 9 16.5C13.1475 16.5 16.5 13.1475 16.5 9C16.5 4.8525 13.1475 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z"
              fill="currentColor"
            ></path>
            <g clipPath="url(#clip0_810_869)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 7.42857C7 7.31491 7.04515 7.2059 7.12553 7.12553C7.2059 7.04515 7.31491 7 7.42857 7H8.14286C8.25652 7 8.36553 7.04515 8.4459 7.12553C8.52628 7.2059 8.57143 7.31491 8.57143 7.42857V10.5714C8.57143 10.6851 8.52628 10.7941 8.4459 10.8745C8.36553 10.9548 8.25652 11 8.14286 11H7.42857C7.31491 11 7.2059 10.9548 7.12553 10.8745C7.04515 10.7941 7 10.6851 7 10.5714V7.42857ZM9.85714 7C9.74348 7 9.63447 7.04515 9.5541 7.12553C9.47372 7.2059 9.42857 7.31491 9.42857 7.42857V10.5714C9.42857 10.6851 9.47372 10.7941 9.5541 10.8745C9.63447 10.9548 9.74348 11 9.85714 11H10.5714C10.6851 11 10.7941 10.9548 10.8745 10.8745C10.9548 10.7941 11 10.6851 11 10.5714V7.42857C11 7.31491 10.9548 7.2059 10.8745 7.12553C10.7941 7.04515 10.6851 7 10.5714 7H9.85714Z"
                fill="currentColor"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_810_869">
                <rect
                  width="4"
                  height="4"
                  fill="white"
                  transform="translate(7 7)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
        </span>
      )}
    </button>
  )
}

Media.MediaImage = MediaImage

function MediaImage({ image }) {
  return (
    <figure className="size-full">
      <Image
        className="object-cover w-full h-full"
        src={image?.asset.url}
        alt={image?.asset.altText}
        width={image?.asset.metadata?.dimensions.width || 800}
        height={image?.asset.metadata?.dimensions.height || 600}
      />
      <figcaption className="sr-only">{image?.asset.description}</figcaption>
    </figure>
  )
}
