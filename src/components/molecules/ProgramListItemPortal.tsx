'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import EducationContent from './EducationContent'
import Icon from '../atoms/Icons'
import Photo from '../atoms/Photo'
import { useEffect } from 'react'

export const ProgramListItemPortal = ({
  item,
  handleOutsideClick,
  isPortalVisible,
  setIsPortalVisible,
}) => {


  // Close the portal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPortalVisible(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [setIsPortalVisible])


  return (
    <>
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence mode="wait">
          {isPortalVisible && (
            <motion.div
              key="portal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: [0.86, 0, 0.07, 1]}}
              exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.86, 0, 0.07, 1] } }} // Exit animation with duration
              data-lenis-prevent="true"
              id="portal-overlay"
              className="fixed inset-0 z-50 flex items-center justify-center"
              onClick={handleOutsideClick}
            >
              <button
                onClick={() => setIsPortalVisible(false)}
                className="fixed inset-0 size-full bg-mørk/50"
              />

              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.86, 0, 0.07, 1] }} // Enter animation with duration
                exit={{ x: "100%", opacity: 0, transition: { duration: 0.3, ease: [0.86, 0, 0.07, 1] } }} // Exit animation for modal content
                className="relative z-10 w-full h-full max-w-2xl p-6 py-24 ml-auto overflow-auto shadow-2xl md:pt-6 md:p-10 bg-lys"
              >
                <div className="aspect-w-16 aspect-h-9">
                  {(item.mainImage || item.mainImage?.url) && (
                  <Photo image={item.mainImage} />
                )}
                  <div className="pt-6 pl-6">
                    <button onClick={() => setIsPortalVisible(false)}>
                      <Icon type="x" />
                    </button>
                  </div>
                </div>
                <EducationContent item={item} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
