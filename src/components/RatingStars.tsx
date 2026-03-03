import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useState } from 'react'
import styles from './RatingStars.module.css'

interface RatingStarsProps {
  onRate: (rating: number) => void
  maxStars?: number
}

export function RatingStars({ onRate, maxStars = 5 }: RatingStarsProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)

  const handleClick = (rating: number) => {
    setSelected(rating)
    onRate(rating)
  }

  return (
    <div className={styles.container}>
      {Array.from({ length: maxStars }, (_, i) => i + 1).map((rating) => {
        const isFilled = (hovered !== null ? rating <= hovered : rating <= (selected ?? 0))
        return (
          <motion.button
            key={rating}
            className={`${styles.star} ${isFilled ? styles.filled : ''}`}
            onClick={() => handleClick(rating)}
            onMouseEnter={() => setHovered(rating)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: rating * 0.05, type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Star
              size={36}
              fill={isFilled ? 'currentColor' : 'none'}
              strokeWidth={1.5}
            />
          </motion.button>
        )
      })}
    </div>
  )
}
