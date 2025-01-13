import Link from 'next/link'
import React from 'react'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import Section from '@/components/sections/Section'
import PageContainer from '@/components/PageContainer'
import { AdvancedButton } from '@/components/atoms/AdvancedButton'

const ErrorPage: React.FC = () => {
  return (
    <PageContainer>
      <Section className="min-h-screen">
        <div className="my-auto text-center col-span-full">
          <Heading tag="h1" type="h1">
            Undskyld, noget gik galt
          </Heading>
          <Paragraph size="regular">
            Vi kan desværre ikke finde siden, du leder efter. Vend tilbage til
            forsiden eller få besvaret dine spørgsmål ved at kontakte os.
          </Paragraph>
        </div>
      </Section>
    </PageContainer>
  )
}

export default ErrorPage
