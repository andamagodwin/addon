"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface AnimatedLogoProps {
  size?: number
  color?: string
  speed?: number
}

export default function AnimatedLogo({ size = 100, color = "#00A99D", speed = 0.8 }: AnimatedLogoProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  // Bar heights as proportions (1 = full height)
  const barHeights = [1, 0.6, 0.6, 0.6]
  const barWidth = size * 0.15
  const barRadius = barWidth / 2
  const gap = size * 0.08
  const totalWidth = barWidth * 4 + gap * 3

  useEffect(() => {
    // Keep animation running
    return () => setIsAnimating(true)
  }, [])

  return (
    <div
      style={{
        width: totalWidth,
        height: size,
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
      }}
      aria-label="Loading"
      role="status"
    >
      {barHeights.map((height, index) => (
        <motion.div
          key={index}
          initial={{ height: `${height * 100}%` }}
          animate={{
            height: isAnimating ? [`${height * 100}%`, `${height * 60}%`, `${height * 100}%`] : `${height * 100}%`,
          }}
          transition={{
            duration: speed * 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: index * (speed / 4),
          }}
          style={{
            width: barWidth,
            borderRadius: barRadius,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  )
}

