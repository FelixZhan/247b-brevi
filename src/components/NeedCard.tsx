import { motion } from 'framer-motion'
import { Leaf, Zap, Target, Dumbbell } from 'lucide-react'
import type { NeedCategory } from '../lib/database.types'
import styles from './NeedCard.module.css'

interface NeedCardProps {
  category: NeedCategory
  onSelect: (category: NeedCategory) => void
}

const needConfig: Record<NeedCategory, { icon: typeof Leaf; label: string; description: string }> = {
  calm: {
    icon: Leaf,
    label: 'Calm',
    description: 'Settle racing thoughts'
  },
  energy: {
    icon: Zap,
    label: 'Energy',
    description: 'Boost alertness'
  },
  reset_attention: {
    icon: Target,
    label: 'Reset Attention',
    description: 'Refocus your mind'
  },
  body: {
    icon: Dumbbell,
    label: 'Body',
    description: 'Release physical tension'
  }
}

export function NeedCard({ category, onSelect }: NeedCardProps) {
  const config = needConfig[category]
  const Icon = config.icon

  return (
    <motion.button
      className={styles.card}
      onClick={() => onSelect(category)}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className={styles.iconWrapper}>
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <div className={styles.content}>
        <span className={styles.label}>{config.label}</span>
        <span className={styles.description}>{config.description}</span>
      </div>
    </motion.button>
  )
}
