export type NeedCategory = 'calm' | 'energy' | 'reset_attention' | 'body'

export interface WorkSession {
  id: string
  started_at: string
  ended_at: string | null
  total_pauses: number
  created_at: string
}

export interface Pause {
  id: string
  session_id: string
  need_category: NeedCategory
  activity_prompt: string
  duration_seconds: number
  rating: number | null
  started_at: string
  completed_at: string | null
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      work_sessions: {
        Row: WorkSession
        Insert: Omit<WorkSession, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<WorkSession, 'id'>>
      }
      pauses: {
        Row: Pause
        Insert: Omit<Pause, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<Pause, 'id'>>
      }
    }
  }
}
