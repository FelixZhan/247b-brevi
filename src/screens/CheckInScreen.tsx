import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '../components/Button'
import { RatingStars } from '../components/RatingStars'
import styles from './CheckInScreen.module.css'

interface CheckInScreenProps {
  onRate: (rating: number) => void
  onSkip: () => void
  loading: boolean
}

export function CheckInScreen({ onRate, onSkip, loading }: CheckInScreenProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  const handleRate = (rating: number) => {
    setSelectedRating(rating)
  }

  const handleSubmit = () => {
    if (selectedRating) {
      onRate(selectedRating)
    }
  }

  return (
    <div className={`screen ${styles.container}`}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className={styles.checkmark}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <motion.path
              d="M12 24L20 32L36 16"
              stroke="var(--forest-green)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            />
          </svg>
        </motion.div>

        <h1 className={styles.title}>Pause Complete</h1>
        <p className={styles.subtitle}>How restorative did that feel?</p>

        <motion.div
          className={styles.rating}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <RatingStars onRate={handleRate} />
          <div className={styles.ratingLabels}>
            <span>Not at all</span>
            <span>Very</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.actions}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleSubmit}
          disabled={!selectedRating}
          loading={loading}
        >
          Continue
        </Button>
        <Button variant="ghost" onClick={onSkip}>
          Skip
        </Button>
      </motion.div>
    </div>
  )
}
