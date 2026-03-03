import { motion } from 'framer-motion'
import { Clock, Coffee } from 'lucide-react'
import { Button } from '../components/Button'
import { formatTime } from '../hooks/useTimer'
import styles from './SessionSummaryScreen.module.css'

interface SessionSummaryScreenProps {
  totalTime: number
  pauseCount: number
  onNewSession: () => void
}

export function SessionSummaryScreen({
  totalTime,
  pauseCount,
  onNewSession
}: SessionSummaryScreenProps) {
  return (
    <div className={`screen ${styles.container}`}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className={styles.celebration}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className={styles.doneIcon}>
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Coffee size={40} strokeWidth={1.5} />
            </motion.div>
          </div>
        </motion.div>

        <h1 className={styles.title}>Session Complete</h1>
        <p className={styles.subtitle}>Great work! Here's your summary</p>

        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Clock size={24} strokeWidth={1.5} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{formatTime(totalTime)}</span>
              <span className={styles.statLabel}>Total Time</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Coffee size={24} strokeWidth={1.5} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{pauseCount}</span>
              <span className={styles.statLabel}>{pauseCount === 1 ? 'Pause' : 'Pauses'} Taken</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.action}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button variant="primary" size="lg" fullWidth onClick={onNewSession}>
          Start New Session
        </Button>
      </motion.div>
    </div>
  )
}
