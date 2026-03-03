import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { Button } from '../components/Button'
import styles from './HomeScreen.module.css'

interface HomeScreenProps {
  onStartSession: () => void
  loading: boolean
}

export function HomeScreen({ onStartSession, loading }: HomeScreenProps) {
  return (
    <div className={`screen ${styles.container}`}>
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          className={styles.logoMark}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
        >
          <div className={styles.pauseIcon}>
            <span />
            <span />
          </div>
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Pauses
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Mindful micro-breaks for<br />focused work
        </motion.p>
      </motion.div>

      <motion.div
        className={styles.action}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onStartSession}
          loading={loading}
        >
          <Play size={20} strokeWidth={2.5} />
          Start Work Session
        </Button>
      </motion.div>
    </div>
  )
}
