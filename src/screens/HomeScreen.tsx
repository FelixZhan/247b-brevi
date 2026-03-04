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
          <svg viewBox="0 0 100 100" className={styles.logoSvg}>
            <path
              d="M50 10 C25 10, 10 30, 10 55 C10 80, 30 90, 50 90 C70 90, 90 75, 90 50 C90 25, 70 10, 50 10"
              fill="currentColor"
            />
            <path
              d="M35 75 Q50 55, 55 35 M35 75 Q45 60, 65 55"
              fill="none"
              stroke="#F7F9FA"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Brevi
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
