'use client'

import Link from 'next/link'
import Heading from '../atoms/Heading'
import InteractiveMarquee from '../atoms/Marquee'
import Section from './Section'
import { clean } from '~/utils/sanitize'
import { resolveHref } from '~/sanity/lib/sanity.links'
import { useState } from 'react'

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
            <Link
              href={'#'}
              className={`inline-flex duration-300 ease-in-out transition-all prose-headings:font-bold ${hovered !== null && hovered !== index ? 'blur-sm' : ''}`}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              key={index}
            >
              <Heading tag="h3" type="h3" spacing="none">
                {link.label}
              </Heading>
            </Link>
          ))}
        </InteractiveMarquee>
      </div>
    </Section>
  )
}

export default QuickLinks
