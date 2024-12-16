import React from 'react'
import Paragraph from '@/components/atoms/Paragraph'
import { AdvancedButton } from '@/components/atoms/AdvancedButton'
import Image from 'next/image'

const BannerWidget = () => {
  return (
    <div className="flex items-center justify-between p-6 bg-purple prose-p:text-light-0">
      <div className="flex items-center">
        <img
          src="/images/backend/Startup.png"
          alt="Sanity logo"
          width={50}
          height={50}
          className="mr-6"
        />
        <Paragraph spacing="none" className="">
          Hej 👋 Vi har en ny opdatering klar til backend&apos;en på jeres
          hjemmeside, så det bliver endnu nemmere at redigere. <br />
          Kontakt din projektleder hos Superego for at høre mere.
        </Paragraph>
      </div>
      <AdvancedButton variant="default" className="px-6 rounded-full">
        Se mere
      </AdvancedButton>
    </div>
  )
}

export default BannerWidget
