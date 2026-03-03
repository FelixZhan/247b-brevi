import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { NeedCard } from '../components/NeedCard'
import type { NeedCategory } from '../lib/database.types'
import styles from './NeedSelectionScreen.module.css'

interface NeedSelectionScreenProps {
  onSelectNeed: (category: NeedCategory) => void
  onCancel: () => void
}

const categories: NeedCategory[] = ['calm', 'energy', 'reset_attention', 'body']

export function NeedSelectionScreen({ onSelectNeed, onCancel }: NeedSelectionScreenProps) {
  return (
    <div className={`screen ${styles.container}`}>
      <motion.button
        className={styles.backButton}
        onClick={onCancel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={20} strokeWidth={2} />
        Back
      </motion.button>

      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className={styles.title}>What do you need?</h1>
        <p className={styles.subtitle}>Select what would help you most right now</p>
      </motion.div>

      <motion.div
        className={styles.grid}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.08, delayChildren: 0.2 }
          }
        }}
      >
        {categories.map((category) => (
          <NeedCard
            key={category}
            category={category}
            onSelect={onSelectNeed}
          />
        ))}
      </motion.div>
    </div>
  )
}
