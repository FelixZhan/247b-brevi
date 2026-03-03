import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { CircularProgress } from '../components/CircularProgress'
import { useCountdown, formatTime } from '../hooks/useTimer'
import type { Activity } from '../data/activities'
import styles from './MicroBreakScreen.module.css'

interface MicroBreakScreenProps {
  activity: Activity
  onComplete: (durationSeconds: number) => void
}

export function MicroBreakScreen({ activity, onComplete }: MicroBreakScreenProps) {
  const [started, setStarted] = useState(false)
  const [actualDuration, setActualDuration] = useState(0)

  const { remaining, isComplete, start, isRunning } = useCountdown(activity.duration)

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setActualDuration(d => d + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isRunning])

  const handleStart = () => {
    setStarted(true)
    start()
  }

  const handleComplete = () => {
    onComplete(actualDuration || activity.duration)
  }

  const progress = started ? ((activity.duration - remaining) / activity.duration) * 100 : 0

  return (
    <div className={`screen ${styles.container}`}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className={styles.label}>Micro-break</span>
      </motion.div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <CircularProgress progress={progress} size={220} strokeWidth={8}>
          <motion.span
            className={styles.timer}
            key={remaining}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            {formatTime(remaining)}
          </motion.span>
        </CircularProgress>

        <motion.div
          className={styles.activityCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={styles.activityTitle}>{activity.title}</h2>
          <p className={styles.activityInstruction}>{activity.instruction}</p>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.action}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {!started ? (
          <Button variant="primary" size="lg" fullWidth onClick={handleStart}>
            Begin
          </Button>
        ) : isComplete ? (
          <Button variant="primary" size="lg" fullWidth onClick={handleComplete}>
            Done
          </Button>
        ) : (
          <Button variant="outline" size="lg" fullWidth onClick={handleComplete}>
            Finish Early
          </Button>
        )}
      </motion.div>
    </div>
  )
}
