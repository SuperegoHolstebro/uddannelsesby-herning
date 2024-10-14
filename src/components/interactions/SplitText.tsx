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

export function SplitText({
    children,
    delay = 0,
    duration = 0.5,
}: {
    children: ReactNode;
    delay?: number;
    duration?: number;
}) {
    const text = typeof children === 'string' ? children : '';

    return (
        <div className='relative block overflow-hidden'>
            {text.split(' ').map((word, wordIndex) => (
                <span
                    key={wordIndex}
                    style={{ whiteSpace: 'nowrap', display: 'inline-block' }} // Prevents word break
                >
                    {word.split('').map((char, index) => (
                        <motion.span
                            key={index}
                            variants={{
                                hidden: {
                                    y: 50,
                                    opacity: 0,
                                },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                },
                            }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ delay: delay + (wordIndex + index) * 0.05, type: "spring", duration }}
                            style={{ display: 'inline-block' }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </div>
    );
}
