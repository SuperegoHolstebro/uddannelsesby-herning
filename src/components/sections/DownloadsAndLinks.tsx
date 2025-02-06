'use client'

import React from 'react'
import Paragraph from '../atoms/Paragraph'
import Icon from '../atoms/Icons'
import Link from 'next/link'

const DownloadsAndLinks = ({ data }, index) => {
  return (
    <ul className="pt-3">
      {data.links &&
        data.links.map((link, index) => (
          <li className="flex items-center w-full text-left group " key={index}>
            <Link
              title={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-6 border-mørk/50 border-b-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon type={link.iconPicker?.icon} className="size-8" />
                  <Paragraph
                    spacing="none"
                    className="transition-all ease-custom duration-735 prose-p:text-small group-hover:ml-12 group-focus-within:ml-12"
                  >
                    {link.title}
                  </Paragraph>
                </div>
                <div>
                  <div className="flex items-center gap-2 uppercase sm:gap-4 sm:flex-row prose-p:text-signal-gul group-hover:prose-p:text-signal-gul group-focus-within:prose-p:text-signal-gul prose-p:text-small">
                    <span className="mx-auto transition-all transform scale-100 opacity-100 ease-custom duration-735 md:mr-4 md:ml-0 text-signal-gul">
                      <Icon className=" sm:size-5 size-5" type="linkArrow" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  )
}

export default DownloadsAndLinks
