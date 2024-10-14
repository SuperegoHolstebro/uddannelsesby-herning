'use client'

import Icon from '@/components/atoms/Icons'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            onClick={scrollToTop}
            className="fixed z-50 p-3 text-white transition-opacity duration-75 ease-in-out bg-black shadow-lg bottom-5 right-5 rounded-xl focus:outline-none"
            aria-label="Scroll to top"
          >
            <span className="*:fill-white *:size-6 hover:fill-green transition-colors">
              <Icon type="chevronUp" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default ScrollToTop
