import React from 'react'
import Paragraph from '@/components/atoms/Paragraph'
import Heading from '@/components/atoms/Heading'

const SuperegoWidget = () => {
  return (
    <div className="h-full p-6 bg-light-0">
      <Heading spacing="default" type="h3" tag="h3" className="font-light">
        Superego{' '}
      </Heading>
      <Paragraph spacing="default" className="">
        Store Torv 1, 2. <br /> 7500 Holstebro
      </Paragraph>
      <Paragraph spacing="default" className="">
        Tlf:{' '}
        <a href="tel:+4570707886" className="underline text-green">
          +45 70 70 78 86
        </a>
        <br /> Mail:{' '}
        <a href="mailto:holstebro@superego.nu" className="underline text-green">
          holstebro@superego.nu
        </a>
      </Paragraph>
      <Paragraph spacing="none" className="">
        Åbent alle hverdage fra kl. 08.00-16.00
      </Paragraph>
    </div>
  )
}

export default SuperegoWidget
