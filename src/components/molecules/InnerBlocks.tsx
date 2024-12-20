import React from 'react'
import Heading from '@/components/atoms/Heading'
import { Button } from '@/components/atoms/Button'
import Paragraph from '@/components/atoms/Paragraph'
import Accordion from '@/components/molecules/Accordion'
import DownloadsAndLinks from '../sections/DownloadsAndLinks'
import { FadeUp } from '../interactions/AnimateFadeIn'

interface InnerBlocks_Type {
  blocks: any
  index: number
}

const InnerBlocks = ({ blocks, index }: InnerBlocks_Type) => {
  return (
    <React.Fragment key={index}>
      {blocks?.map((block, index) => {
        switch (block._type) {
          case 'heading':
            return <InnerBlocks.Title key={index} index={index} data={block} />
          case 'textBlock':
            return (
              <InnerBlocks.Paragraphs key={index} index={index} data={block} />
            )
          case 'button':
            return (
              <div className="mt-8" key={index}>
                <Button link={block.link}>{block.link.label}</Button>
              </div>
            )
          case 'accordion':
            return <InnerBlocks.AccordionGroup key={index} data={block} />
          case 'DownloadsAndLinksType':
            return <DownloadsAndLinks key={index} data={block} />
          default:
            return null
        }
      })}
    </React.Fragment>
  )
}

export default InnerBlocks

InnerBlocks.Title = Title
InnerBlocks.AccordionGroup = AccordionGroup
InnerBlocks.Paragraphs = Paragraphs

/* compound components */
function Title({ data, index }) {
  return (
    <FadeUp delay={index * 0.1}>
      <Heading
        size={data.heading.tag}
        type={data.heading.tag}
        spacing="small"
        dangerouslySetInnerHTML={{ __html: data.heading.heading }}
      />
    </FadeUp>
  )
}

function AccordionGroup({ data }) {
  return (
    <div className="w-full mb-8 space-y-4">
      {data.accordions.map((accordion, index) => (
        <FadeUp key={accordion._key} delay={0.1 * index}>
          <Accordion
            unfloded={accordion.unfloded}
            title={accordion.title}
            text={accordion.body}
            blocks={undefined}
          />
        </FadeUp>
      ))}
    </div>
  )
}

function Paragraphs({ data, index }) {
  return (
    <FadeUp delay={0.1 * index}>
      <Paragraph spacing="small" portableText>
        {data.body}
      </Paragraph>
    </FadeUp>
  )
}
