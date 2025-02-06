import React from 'react'
import Heading from '@/components/atoms/Heading'
import { AnimatePresence, motion } from 'framer-motion'
import Photo from '../atoms/Photo'

/**
 *
 * @returns: En experience card, der viser information om en oplevelser.
 * @example: <ExperienceCard />
 * @alias: ExperienceCard
 * @module: components/atoms/ExperienceCard
 * @summary: Denne komponent bruges til at vise information om en oplevelser.
 * @see: src/components/atoms/ExperienceCard.tsx
 * @version: 1.0.0
 * @property: [Experience]
 * @author: Emilie Hjøllund
 **/

const ExperienceCard = ({
  experience,
  isActive,
  onMouseEnter,
  onMouseLeave,
  isAnyActive,
}) => {
  return (
    <>
      <div
        key={experience?._key}
        className={`hidden md:block experience-card-item group/experience-card relative  w-full overflow-hidden transition-all ease-custom duration-735 ${isActive ? 'scale-110 z-10' : 'scale-100'}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="h-fit isolation-auto">
          <div className="aspect-w-5 md:aspect-w-4 aspect-h-6">
            {experience.mainImage ? (
              <Photo image={experience.mainImage} objectFit="cover" />
            ) : (
              <img
                className="object-cover"
                src="./placeholder.svg"
                alt={experience.title}
              />
            )}
          </div>
          <div className="pt-3 space-y-4 text-lys ">
            <Heading
              text="wrap"
              type="h4"
              tag="h4"
              spacing="none"
              clamp={3}
              className={`${isAnyActive && !isActive ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 group-hover/experience-card:text-signal-pink`}
            >
              {experience?.title}
            </Heading>

            <AnimatePresence presenceAffectsLayout>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.86, 0, 0.07, 1] }}
                  className="flex items-center justify-between transition-opacity duration-300 opacity-100 text-lys"
                ></motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Mobile */}

      <div
        key={experience?._key}
        className="relative block w-full overflow-hidden transition-all rounded md:hidden group/experience-card experience-card-item ease-custom duration-735"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="h-fit isolation-auto">
          <div className="aspect-1">
            {experience.mainImage ? (
              <Photo image={experience.mainImage} objectFit="cover" />
            ) : (
              <img
                className="object-cover"
                src="./placeholder.svg"
                alt={experience.title}
              />
            )}
          </div>

          <div className="pt-8 space-y-4 ">
            <Heading text="wrap" type="h4" tag="h4" spacing="none" clamp={3}>
              {experience?.title}
            </Heading>

            <AnimatePresence presenceAffectsLayout>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.86, 0, 0.07, 1] }}
                className="flex items-center justify-between transition-opacity duration-300 opacity-100"
              ></motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExperienceCard
