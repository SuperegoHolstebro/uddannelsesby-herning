"use client";
import React, { ReactNode } from 'react';
import { motion } from "framer-motion";

/**
 *
 * @returns: En component der animere et element ind i viewet.  
 * @example: <AnimateFadeIn />
 * @alias: AnimateFadeIn
 * @module: components/interactions/AnimateFadeIn
 * @summary: Denne komponent bruges til at animere et element ind i viewet.
 * @see: src/components/interactions/AnimateFadeIn.tsx
 * @version: 1.0.0
 * @property: [children]
 * @author: Kasper Buchholtz
 *
 **/

export function FadeUp({
  children,
  delay = 0,
  duration = 0.5,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 15,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay, type: "spring", duration }}
    >
      {children}
    </motion.div>
  );
}