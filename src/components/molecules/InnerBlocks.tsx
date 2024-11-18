import React from 'react'
import Heading from '@/components/atoms/Heading'
import { Button } from '@/components/atoms/Button'
import Paragraph from '@/components/atoms/Paragraph'
import Accordion from '@/components/molecules/Accordion'
import DownloadsAndLinks from '@/components/sections/DownloadsAndLinks'
import { clean } from '~/utils/sanitize'

const InnerBlocks = ({ blocks }) => {
  return (
    <>
      {blocks?.map((block, index) => {
        switch (block._type) {
          case 'heading':
            return <InnerBlocks.Title key={index} data={block} />
          case 'textBlock':
            return <InnerBlocks.Paragraphs key={index} data={block} />
          case 'button':
            return (
              <>
                <div className="mt-8">
                  <Button variant={clean(block.style)} link={block.link}>
                    {block.link.label}
                  </Button>
                </div>
              </>
            )
          case 'accordion':
            return <InnerBlocks.Accordions key={index} data={block} />
          case 'DownloadsAndLinksType':
            return <DownloadsAndLinks key={index} data={block} />
          default:
            return null
        }
      })}
    </>
  )
}

export default InnerBlocks

InnerBlocks.Title = Title
InnerBlocks.Accordions = Accordions
InnerBlocks.Paragraphs = Paragraphs

/* compound components */
function Title({ data }) {
  return (
    <>
      <Heading size={data.heading.tag} type={data.heading.tag}>
        {data.heading.heading}
      </Heading>
    </>
  )
}

function Accordions({ data }) {
  return (
    <>
      <div className="w-full mb-8 space-y-4">
        {data.accordions.map((accordion, accordionIndex) => (
          <Accordion
            unfloded={accordion.unfloded}
            title={accordion.title}
            text={accordion.body}
            blocks={undefined}
            key={accordionIndex}
          />
        ))}
      </div>
    </>
  )
}

function Paragraphs({ data }) {
  return (
    <>
      <Paragraph portableText>{data.body}</Paragraph>
    </>
  )
}
