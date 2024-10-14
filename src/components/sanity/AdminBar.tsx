'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'


const AdminBar = () => {
  const menuItems = [
    {
      label: 'Rediger denne side',
      path: '/',
      svg: '<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_627_378)"><path d="M5.71427 14.4886L0.571411 15.9286L2.01141 10.7857L11.4286 1.41431C11.535 1.30545 11.6622 1.21896 11.8024 1.15992C11.9427 1.10087 12.0935 1.07045 12.2457 1.07045C12.3979 1.07045 12.5487 1.10087 12.689 1.15992C12.8292 1.21896 12.9564 1.30545 13.0628 1.41431L15.0857 3.44859C15.1928 3.55483 15.2778 3.68124 15.3359 3.8205C15.3939 3.95977 15.4238 4.10915 15.4238 4.26002C15.4238 4.41089 15.3939 4.56027 15.3359 4.69954C15.2778 4.83881 15.1928 4.96521 15.0857 5.07145L5.71427 14.4886Z" strokeLinecap="round" strokeLinejoin="round"/></g><defs><clipPath id="clip0_627_378"><rect width="16" height="16" fill="white" transform="translate(0 0.5)"/></clipPath></defs></svg>',
    },
    {
      label: 'Temaindstillinger',
      path: '/super-login/structure/indstillinger',
      svg: '<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_627_383)"><path d="M6.2857 1.64285H0.571411V7.35714H6.2857V1.64285Z" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.1429 15.9286H9.42859" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.42859 10.2143H15.1429" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.42859 13.0714H15.1429" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.4285 7.35714H9.14282L12.2857 1.07143L15.4285 7.35714Z" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.42855 15.9286C5.00651 15.9286 6.2857 14.6494 6.2857 13.0714C6.2857 11.4935 5.00651 10.2143 3.42855 10.2143C1.8506 10.2143 0.571411 11.4935 0.571411 13.0714C0.571411 14.6494 1.8506 15.9286 3.42855 15.9286Z" strokeLinecap="round" strokeLinejoin="round"/></g><defs><clipPath id="clip0_627_383"><rect width="16" height="16" fill="white" transform="translate(0 0.5)"/></clipPath></defs></svg>',
    },
  ]

  const [makeSmaller, setMakeSmaller] = useState(false)

  const handleButtonClick = () => {
    setMakeSmaller(!makeSmaller)
    localStorage.setItem('makeSmaller', JSON.stringify(!makeSmaller))
  }

  useEffect(() => {
    const storedMakeSmaller = localStorage.getItem('makeSmaller')
    if (storedMakeSmaller) {
      setMakeSmaller(JSON.parse(storedMakeSmaller))
    }
  }, [])

  return (
    <>
      <div
        className={`bottom-0 fixed -translate-y-4 h-16 z-[calc(infinity+1)] ${makeSmaller ? 'w-auto' : 'w-full'}`}
      >
        <div className="flex px-2 py-2 mx-4 rounded-lg bg-slate-50">
          <div className="flex col-span-4 ">
            <a className="se-item" href={`/super-login`}>
              <Image
                className="bg-dark p-1.5 rounded-lg "
                src="/favicon.ico"
                alt=""
                width="50"
                height="50"
              />
              {/* <img
                className="bg-dark size-13 p-1.5 rounded-lg "
                src="/favicon.svg"
                alt=""
              /> */}
            </a>
            <button onClick={handleButtonClick} className="pl-2 ml-4">
              <svg
                className="fill-dark"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.33588 1.32063C4.5598 1.10688 4.84478 1 5.19084 1C5.5369 1 5.82188 1.10688 6.0458 1.32063L11.6641 6.68386C11.7863 6.80045 11.873 6.92676 11.9243 7.06278C11.9748 7.1988 12 7.34454 12 7.5C12 7.65546 11.9695 7.80625 11.9084 7.95238C11.8473 8.09773 11.7659 8.21898 11.6641 8.31614L6.0458 13.6794C5.82188 13.8931 5.5369 14 5.19084 14C4.84478 14 4.5598 13.8931 4.33588 13.6794C4.11196 13.4656 4 13.1936 4 12.8632C4 12.5329 4.11196 12.2608 4.33588 12.0471L9.09924 7.5L4.33588 2.95291C4.11196 2.73916 4 2.46711 4 2.13677C4 1.80643 4.11196 1.53438 4.33588 1.32063Z" />
              </svg>
            </button>

            {makeSmaller ? (
              ''
            ) : (
              <span className="hidden my-auto ml-6 md:block">
                Du er logget ind som <strong>Admin</strong>
              </span>
            )}
          </div>
          {makeSmaller ? (
            ''
          ) : (
            <ul className="col-span-8 col-start-5 text-small w-full flex space-x-0.5 text-dark h-full justify-end items-center my-auto">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className="flex items-center gap-2 px-4 py-2 transition-all rounded-full hover:bg-green "
                  >
                    <div
                      className="block size-5 stroke-dark"
                      dangerouslySetInnerHTML={{ __html: item.svg }}
                    ></div>
                    <span className="hidden text-left md:inline-block">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
              <PageCacheButton />
              <CurrentPageCacheButton />
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

const CurrentPageCacheButton = () => {
  return (
    <li>
      <button
        className="flex items-center gap-2 px-4 py-2 transition-all rounded-full hover:bg-green "
        onClick={() => {
          // Clear the cache of the website
          localStorage.clear()
          window.location.reload()
        }}
      >
        <div className="block size-5 stroke-dark">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_627_401)">
              <path
                d="M8.39189 2.78571H1.14284C0.827249 2.78571 0.571411 3.04155 0.571411 3.35713V12.5C0.571411 12.8155 0.827249 13.0714 1.14284 13.0714H14.8571C15.1727 13.0714 15.4286 12.8155 15.4286 12.5V8.49999"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.85715 13.0714L5.71429 15.9286"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.14282 13.0714L10.2857 15.9286"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.57141 15.9286H11.4286"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.4285 5.73186L10.8571 1.16043"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.4285 1.16043L10.8571 5.73186"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_627_401">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <span className="hidden text-left md:inline-block">
          Slet hjemmesidens cache
        </span>
      </button>
    </li>
  )
}

const PageCacheButton = () => {
  return (
    <li>
      <button
        className="flex items-center gap-2 px-4 py-2 transition-all rounded-full hover:bg-green "
        // clear current page cache
        onClick={() => {
          localStorage.removeItem('page')
          window.location.reload()
        }}
      >
        <div className="block size-5 stroke-dark">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_627_393)">
              <path
                d="M14.2857 1.07143H1.71427C1.08309 1.07143 0.571411 1.5831 0.571411 2.21428V14.7857C0.571411 15.4169 1.08309 15.9286 1.71427 15.9286H14.2857C14.9169 15.9286 15.4286 15.4169 15.4286 14.7857V2.21428C15.4286 1.5831 14.9169 1.07143 14.2857 1.07143Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M0.571411 4.5H15.4286"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.2857 12.5L5.71429 7.92857"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.2857 7.92857L5.71429 12.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_627_393">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <span className="hidden text-left md:inline-block">
          Slet denne sides cache
        </span>
      </button>
    </li>
  )
}

export default AdminBar
