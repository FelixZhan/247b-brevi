import { useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { WorkSession, Pause, NeedCategory } from '../lib/database.types'

export function useSession() {
  const [currentSession, setCurrentSession] = useState<WorkSession | null>(null)
  const [currentPause, setCurrentPause] = useState<Pause | null>(null)
  const [loading, setLoading] = useState(false)

  const startSession = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('work_sessions')
      .insert({ started_at: new Date().toISOString(), total_pauses: 0 } as never)
      .select()
      .single()

    if (error) {
      console.error('Error starting session:', error)
      setLoading(false)
      return null
    }

    setCurrentSession(data as WorkSession)
    setLoading(false)
    return data as WorkSession
  }, [])

  const endSession = useCallback(async () => {
    if (!currentSession) return null

    setLoading(true)
    const { data, error } = await supabase
      .from('work_sessions')
      .update({ ended_at: new Date().toISOString() } as never)
      .eq('id', currentSession.id)
      .select()
      .single()

    if (error) {
      console.error('Error ending session:', error)
      setLoading(false)
      return null
    }

    setCurrentSession(null)
    setLoading(false)
    return data as WorkSession
  }, [currentSession])

  const startPause = useCallback(async (category: NeedCategory, activityPrompt: string) => {
    if (!currentSession) return null

    setLoading(true)
    const { data, error } = await supabase
      .from('pauses')
      .insert({
        session_id: currentSession.id,
        need_category: category,
        activity_prompt: activityPrompt,
        started_at: new Date().toISOString(),
        duration_seconds: 0
      } as never)
      .select()
      .single()

    if (error) {
      console.error('Error starting pause:', error)
      setLoading(false)
      return null
    }

    setCurrentPause(data as Pause)
    setLoading(false)
    return data as Pause
  }, [currentSession])

  const completePause = useCallback(async (durationSeconds: number) => {
    if (!currentPause || !currentSession) return null

    setLoading(true)
    const { data, error } = await supabase
      .from('pauses')
      .update({
        completed_at: new Date().toISOString(),
        duration_seconds: durationSeconds
      } as never)
      .eq('id', currentPause.id)
      .select()
      .single()

    if (error) {
      console.error('Error completing pause:', error)
      setLoading(false)
      return null
    }

    await supabase
      .from('work_sessions')
      .update({ total_pauses: currentSession.total_pauses + 1 } as never)
      .eq('id', currentSession.id)

    setCurrentSession(prev => prev ? { ...prev, total_pauses: prev.total_pauses + 1 } : null)
    setCurrentPause(data as Pause)
    setLoading(false)
    return data as Pause
  }, [currentPause, currentSession])

  const ratePause = useCallback(async (rating: number) => {
    if (!currentPause) return null

    setLoading(true)
    const { data, error } = await supabase
      .from('pauses')
      .update({ rating } as never)
      .eq('id', currentPause.id)
      .select()
      .single()

    if (error) {
      console.error('Error rating pause:', error)
      setLoading(false)
      return null
    }

    setCurrentPause(null)
    setLoading(false)
    return data as Pause
  }, [currentPause])

  const skipRating = useCallback(() => {
    setCurrentPause(null)
  }, [])

  return {
    currentSession,
    currentPause,
    loading,
    startSession,
    endSession,
    startPause,
    completePause,
    ratePause,
    skipRating
  }
}
