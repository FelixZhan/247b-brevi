import { motion } from 'framer-motion'
import { Pause, Square } from 'lucide-react'
import { Button } from '../components/Button'
import { formatTime } from '../hooks/useTimer'
import styles from './ActiveSessionScreen.module.css'

interface ActiveSessionScreenProps {
  elapsedSeconds: number
  pauseCount: number
  onPause: () => void
  onEndSession: () => void
}

export function ActiveSessionScreen({
  elapsedSeconds,
  pauseCount,
  onPause,
  onEndSession
}: ActiveSessionScreenProps) {
  return (
    <div className={`screen ${styles.container}`}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className={styles.label}>Work Session</span>
        <div className={styles.pauseCount}>
          {pauseCount} {pauseCount === 1 ? 'pause' : 'pauses'}
        </div>
      </motion.div>

      <motion.div
        className={styles.timerSection}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className={styles.timerRing}>
          <motion.div
            className={styles.pulseRing}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <div className={styles.timerInner}>
            <span className={styles.time}>{formatTime(elapsedSeconds)}</span>
            <span className={styles.timeLabel}>elapsed</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={styles.actions}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onPause}
        >
          <Pause size={20} strokeWidth={2.5} />
          Take a Pause
        </Button>

        <Button
          variant="ghost"
          onClick={onEndSession}
        >
          <Square size={16} strokeWidth={2.5} />
          End Session
        </Button>
      </motion.div>
    </div>
  )
}
