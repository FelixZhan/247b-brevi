import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion, type Transition } from 'framer-motion'
import { useSession } from './hooks/useSession'
import { useTimer } from './hooks/useTimer'
import { getRandomActivity, Activity } from './data/activities'
import type { NeedCategory } from './lib/database.types'
import { HomeScreen } from './screens/HomeScreen'
import { ActiveSessionScreen } from './screens/ActiveSessionScreen'
import { NeedSelectionScreen } from './screens/NeedSelectionScreen'
import { MicroBreakScreen } from './screens/MicroBreakScreen'
import { CheckInScreen } from './screens/CheckInScreen'
import { SessionSummaryScreen } from './screens/SessionSummaryScreen'
import styles from './App.module.css'

type AppScreen =
  | 'home'
  | 'active-session'
  | 'need-selection'
  | 'micro-break'
  | 'check-in'
  | 'session-summary'

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.98 }
}

const pageTransition: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 25
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home')
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null)
  const [sessionDuration, setSessionDuration] = useState(0)

  const {
    currentSession,
    loading,
    startSession,
    endSession,
    startPause,
    completePause,
    ratePause,
    skipRating
  } = useSession()

  const sessionTimer = useTimer()

  const handleStartSession = useCallback(async () => {
    const session = await startSession()
    if (session) {
      sessionTimer.reset()
      sessionTimer.start()
      setCurrentScreen('active-session')
    }
  }, [startSession, sessionTimer])

  const handleTakePause = useCallback(() => {
    sessionTimer.pause()
    setCurrentScreen('need-selection')
  }, [sessionTimer])

  const handleCancelPause = useCallback(() => {
    sessionTimer.start()
    setCurrentScreen('active-session')
  }, [sessionTimer])

  const handleSelectNeed = useCallback(async (category: NeedCategory) => {
    const activity = getRandomActivity(category)
    setCurrentActivity(activity)

    await startPause(category, activity.title)
    setCurrentScreen('micro-break')
  }, [startPause])

  const handleCompleteBreak = useCallback(async (durationSeconds: number) => {
    await completePause(durationSeconds)
    setCurrentScreen('check-in')
  }, [completePause])

  const handleRate = useCallback(async (rating: number) => {
    await ratePause(rating)
    sessionTimer.start()
    setCurrentScreen('active-session')
    setCurrentActivity(null)
  }, [ratePause, sessionTimer])

  const handleSkipRating = useCallback(() => {
    skipRating()
    sessionTimer.start()
    setCurrentScreen('active-session')
    setCurrentActivity(null)
  }, [skipRating, sessionTimer])

  const handleEndSession = useCallback(async () => {
    sessionTimer.pause()
    setSessionDuration(sessionTimer.seconds)
    await endSession()
    setCurrentScreen('session-summary')
  }, [endSession, sessionTimer])

  const handleNewSession = useCallback(() => {
    setSessionDuration(0)
    setCurrentScreen('home')
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') {
        if (currentScreen === 'active-session') {
          handleTakePause()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentScreen, handleTakePause])

  return (
    <div className={styles.app}>
      <div className={styles.background}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
      </div>

      <main className={styles.main}>
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              style={{ flex: 1, display: 'flex' }}
            >
              <HomeScreen
                onStartSession={handleStartSession}
                loading={loading}
              />
            </motion.div>
          )}

          {currentScreen === 'active-session' && currentSession && (
            <motion.div
              key="active-session"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              style={{ flex: 1, display: 'flex' }}
            >
              <ActiveSessionScreen
                elapsedSeconds={sessionTimer.seconds}
                pauseCount={currentSession.total_pauses}
                onPause={handleTakePause}
                onEndSession={handleEndSession}
              />
            </motion.div>
          )}

          {currentScreen === 'need-selection' && (
            <motion.div
              key="need-selection"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              style={{ flex: 1, display: 'flex' }}
            >
              <NeedSelectionScreen
                onSelectNeed={handleSelectNeed}
                onCancel={handleCancelPause}
              />
            </motion.div>
          )}

          {currentScreen === 'micro-break' && currentActivity && (
            <motion.div
              key="micro-break"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              style={{ flex: 1, display: 'flex' }}
            >
              <MicroBreakScreen
                activity={currentActivity}
                onComplete={handleCompleteBreak}
              />
            </motion.div>
          )}

          {currentScreen === 'check-in' && (
            <motion.div
              key="check-in"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              style={{ flex: 1, display: 'flex' }}
            >
              <CheckInScreen
                onRate={handleRate}
                onSkip={handleSkipRating}
                loading={loading}
              />
            </motion.div>
          )}

          {currentScreen === 'session-summary' && (
            <motion.div
              key="session-summary"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              style={{ flex: 1, display: 'flex' }}
            >
              <SessionSummaryScreen
                totalTime={sessionDuration}
                pauseCount={currentSession?.total_pauses ?? 0}
                onNewSession={handleNewSession}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
