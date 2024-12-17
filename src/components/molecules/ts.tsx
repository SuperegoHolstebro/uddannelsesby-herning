'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import EducationContent from './EducationContent'
import Icon from '../atoms/Icons'
import Photo from '../atoms/Photo'

export const ProgramListItemPortal = ({
  item,
  handleOutsideClick,
  isPortalVisible,
  setIsPortalVisible,
}) => {
  return (
    <>
      {createPortal(
        <AnimatePresence mode="wait">
          {isPortalVisible && (
            <motion.div
              key="portal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }} // Exit animation with duration
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
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0, transition: { duration: 0.5 } }} // Exit animation for modal content
                className="relative z-10 w-full h-full max-w-2xl p-6 py-24 ml-auto overflow-auto shadow-2xl md:pt-6 md:p-10 bg-lys"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <Photo image={item.mainImage} />
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
