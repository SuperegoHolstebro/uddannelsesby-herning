"use client"
import React, { useState } from 'react'
import Icon from '../atoms/Icons'
import { motion, AnimatePresence } from 'framer-motion'

const Modal = ({ children, openModal }) => {
  return (
    <>{children && <Modal.Medal onClose={openModal}>{children}</Modal.Medal>}</>
  )
}

export default Modal

Modal.Medal = Medal
Modal.CloseButton = CloseButton

function CloseButton({ onClose }) {
  return (
    <button className="absolute top-4 right-4 z-40 group " onClick={onClose}>
      <span className="sr-only">Luk</span>
      <span>
        <Icon
          className="fill-dark group-hover:fill-green transition-colors ease-in-out"
          type="x"
        />
      </span>
    </button>
  )
}

function Medal({ children, onClose }) {
  return (
    <>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
        transition={{ duration: 0.3, ease: [0.77, 0, 0.18, 1] }}
        className="fixed inset-0 z-[calc(infinity+1)] w-full h-full bg-dark/50"
        onClick={onClose}
      />
      <div className="fixed w-full h-auto mx-auto z-[calc(infinity+2)]  translate-x-1/2 -translate-y-1/2 rounded top-1/2 right-1/2 pointer-events-none ">
        <motion.div
          className="w-full max-w-4xl overflow-hidden relative rounded bg-light-base mx-auto pointer-events-auto"
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 44, transition: { duration: 0.25 } }}
          transition={{ duration: 0.3, ease: [0.77, 0, 0.18, 1] }}
        >
          <Modal.CloseButton onClose={onClose} />
          <div>{children}</div>
        </motion.div>
      </div>
    </>
  )
}
