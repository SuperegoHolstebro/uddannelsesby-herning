'use client'

import React from 'react'
import Heading from '../atoms/Heading'
import Paragraph from '../atoms/Paragraph'
import Section from '../sections/Section'
import Icon from '../atoms/Icons'

const DownloadsAndLinks = ({ data }, index) => {
  return (
    <Section
      variant="lys"
      className=""
      paddingBottom={data.design?.padding?.spacingBottom}
      paddingTop={data.design?.padding?.spacingTop}
    >
      <div
        key={index}
        className="col-start-1 -col-end-1 2xl:col-start-7 2xl:-col-end-7 lg:col-start-3 lg:-col-end-3 md:col-start-3 md:-col-end-3 xl:col-start-6 xl:-col-end-6 sm:col-start-2 sm:-col-end-2"
      >
        <Heading tag="h3" type="h3" spacing="small">
          {data.title}
        </Heading>
        <Paragraph>{data?.description}</Paragraph>
        <ul className="pt-8">
          {data.links &&
            data.links.map((link, index) => (
              <li
                className="flex items-center w-full text-left transition-all duration-500 ease-in-out border-b-2 group border-signal-gultekst/50"
                key={index}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-6 transition-all duration-500 ease-in-out group-hover:prose-headings:text-signal-gul group-focus-within:prose-headings:text-signal-gul"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <Icon type={link.iconPicker?.icon} className="size-8" />
                      <Paragraph spacing="none" className="prose-p:text-small">
                        {link.title}
                      </Paragraph>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 uppercase sm:gap-4 sm:flex-row prose-p:text-signal-gul group-hover:prose-p:text-signal-gul group-focus-within:prose-p:text-signal-gul prose-p:text-small">
                        <span className="mx-auto transition-all duration-500 ease-in-out transform scale-100 opacity-100 md:mr-4 md:ml-0 text-signal-gul">
                          <Icon
                            className=" sm:size-5 size-5"
                            type="linkArrow"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
        </ul>
      </div>
    </Section>
  )
}

export default DownloadsAndLinks
