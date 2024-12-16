'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import Heading from '@/components/atoms/Heading'
import Icon from '@/components/atoms/Icons'
import Paragraph from '@/components/atoms/Paragraph'

type AccordionProps = {
  title: string
  unfloded: boolean
  text: any
  blocks: any
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  unfloded,
  text,
  ...props
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(!unfloded)

  useEffect(() => {
    setIsPanelOpen(unfloded)
  }, [unfloded])

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen)
  }

  return (
    <div
      {...props}
      data-type="accordion"
      className="relative w-full transition-all rounded group bg-light-0 last:mt-10"
    >
      <AccordionButton onClick={togglePanel}>
        <Heading
          className="m-0 mr-4 prose text-left transition-all"
          spacing="none"
          tag="h6"
          type="h6"
        >
          {title}
        </Heading>
        <AccordionIcon isPanelOpen={isPanelOpen} />
      </AccordionButton>
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AccordionPanel>
              <Paragraph portableText size="regular">
                {text}
              </Paragraph>
            </AccordionPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const AccordionButton: React.FC<{
  onClick: () => void
  children: React.ReactNode
}> = ({ onClick, children }) => {
  return (
    <button
      className="relative flex items-center justify-between w-full px-4 py-4 transition-colors pr-13"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const AccordionIcon: React.FC<{ isPanelOpen: boolean }> = ({ isPanelOpen }) => {
  return (
    <span
      className={`${isPanelOpen ? 'rotate-180' : 'rotate-0'} fill-dark right-4 absolute w-auto fill-blues-dark-100 *:size-4 [&_svg_path]:!fill-dark transition-all`}
    >
      <Icon type="chevronDown" />
    </span>
  )
}

const AccordionPanel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="px-4 pb-6 text-dark accordion__content has-text-wrap [&:not(:first-child)]:mr-4">
      {children}
    </div>
  )
}

export default Accordion
