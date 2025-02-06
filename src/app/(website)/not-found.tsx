import Link from 'next/link'
import React from 'react'
import { AdvancedButton } from '~/components/atoms/AdvancedButton'
import Heading from '~/components/atoms/Heading'
import Paragraph from '~/components/atoms/Paragraph'
import PageContainer from '~/components/PageContainer'
import Section from '~/components/sections/Section'

const ErrorPage: React.FC = () => {
  return (
    <PageContainer>
      <Section className="min-h-screen bg-signal-pink">
        <div className="my-auto text-center col-span-full">
          <Heading tag="h1" type="h1">
            Ups, vi kan ikke se det for os
          </Heading>
          <Paragraph size="regular">
            Vi kan desværre ikke finde siden, du leder efter. Gå til forsiden
            for at se det for dig.
          </Paragraph>
          <div className="flex justify-center gap-4 mt-8">
            <AdvancedButton variant="default">
              <Link href="/">Gå til forsiden</Link>
            </AdvancedButton>
          </div>
        </div>
      </Section>
    </PageContainer>
  )
}

export default ErrorPage
