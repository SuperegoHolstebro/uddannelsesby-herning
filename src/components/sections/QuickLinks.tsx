'use client'

import Heading from '../atoms/Heading'
import InteractiveMarquee from '../atoms/Marquee'
import Section from './Section'
import { clean } from '~/utils/sanitize'
import React, { useState } from 'react'
import { Button } from '../atoms/Button'

const QuickLinks = ({ data }) => {
  const [hovered, setHovered] = useState(null)

  return (
    <Section
      paddingX="none"
      id={clean(data?.SectionSettings?.anchor?.current)}
      paddingTop="none"
      paddingBottom="none"
      variant={clean(data?.design?.color?.color)}
      className="overflow-hidden"
    >
      <div className="col-span-full *:w-full">
        <InteractiveMarquee speed={hovered ? 0 : 1}>
          {data?.quickLinks.map((link, index) => (
            <React.Fragment key={index}>
              <Button
                variant="none"
                showSvg={false}
                title={link.label}
                className={`inline-flex px-0 transition-all ease-custom duration-735 prose-headings:font-bold ${hovered !== null && hovered !== index ? 'blur-sm' : ''}`}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                link={link}
              >
                <Heading tag="h3" type="h3" spacing="none">
                  {link.label}
                </Heading>
              </Button>
            </React.Fragment>
          ))}
        </InteractiveMarquee>
      </div>
    </Section>
  )
}

export default QuickLinks
