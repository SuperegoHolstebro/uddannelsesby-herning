'use client'
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Heading from './Heading'
import Paragraph from './Paragraph'
import Photo from './Photo'
import Icon from './Icons'
import EducationContent from '../molecules/EducationContent'
import { ProgramListItemPortal } from '../molecules/ts'

export const ProgramListItem = ({ item }) => {
  const [isPortalVisible, setIsPortalVisible] = useState(false)

  // Toggle portal visibility
  const togglePortal = () => {
    setIsPortalVisible(!isPortalVisible)
  }

  // Close portal when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target.id === 'portal-overlay') {
      setIsPortalVisible(false)
    }
  }

  let educationTitle = ''
  switch (item.edducation.title) {
    case 'Aarhus Universitet':
      educationTitle = 'bg-mørk text-lys hover:text-mørk hover:bg-signal-pink'
      break
    case 'VIA University College':
      educationTitle = 'bg-grå text-mørk hover:text-mørk hover:bg-signal-pink'
      break
    case 'EAMV':
      educationTitle =
        'border-mørk border hover:text-mørk hover:bg-signal-pink hover:border-signal-pink'
      break
    default:
      educationTitle = 'bg-mørk text-lys hover:text-mørk hover:bg-signal-pink'
  }

  return (
    <li className="relative w-full" data-edducation={item.edducation?.title}>
      <button
        onClick={togglePortal}
        className={`p-4 transition-all ease-custom duration-735 flex justify-between w-full text-left group ${educationTitle}`}
      >
        <div className="justify-between hidden w-full md:flex">
          <div>
            <div className="font-bold">
              <Heading tag="p" type="p" spacing="none" className="font-bold">
                {item.title}
              </Heading>
            </div>
            <div className="text-sm">
              <Paragraph spacing="none">
                {item.time.start} - {item.time.end}
              </Paragraph>
            </div>
          </div>
          <Paragraph spacing="none">
            <span className="flex items-center gap-4">
              {item.edducation?.title}
              <span>
                <svg
                  className="group-hover:rotate-[360deg] transition-all ease-custom duration-735"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1085_1518)">
                    <path
                      d="M7 0.963135V13.0369"
                      stroke="currentColor"
                      strokeWidth="1.71"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M0.962891 6.96277H13.0366"
                      stroke="currentColor"
                      strokeWidth="1.71"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1085_1518">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </span>
          </Paragraph>
        </div>

        <div className=" md:hidden">
          <div className="space-y-3">
            <div className="font-bold">
              <Heading tag="p" type="p" spacing="none" className="font-bold">
                {item.title}
              </Heading>
            </div>
            <Paragraph spacing="none">
              <span className="flex items-center gap-4">
                {item.edducation?.title}
                <span>
                  <svg
                    className="group-hover:rotate-[360deg] transition-all ease-custom duration-735 absolute top-4 right-4 md:relative"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1085_1518)">
                      <path
                        d="M7 0.963135V13.0369"
                        stroke="currentColor"
                        strokeWidth="1.71"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M0.962891 6.96277H13.0366"
                        stroke="currentColor"
                        strokeWidth="1.71"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1085_1518">
                        <rect width="14" height="14" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </span>
            </Paragraph>
            <div className="text-sm">
              <Paragraph spacing="none">
                {item.time.start} - {item.time.end}
              </Paragraph>
            </div>
          </div>
        </div>
      </button>

      <ProgramListItemPortal
        handleOutsideClick={handleOutsideClick}
        item={item}
        isPortalVisible={isPortalVisible}
        setIsPortalVisible={setIsPortalVisible}
      />
    </li>
  )
}
