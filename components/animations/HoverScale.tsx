'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HoverScaleProps {
  children: ReactNode
  scale?: number
  duration?: number
  className?: string
}

export default function HoverScale({
  children,
  scale = 1.05,
  duration = 0.3,
  className = ''
}: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{
        scale,
        transition: { duration, ease: [0.25, 0.4, 0.25, 1] }
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
