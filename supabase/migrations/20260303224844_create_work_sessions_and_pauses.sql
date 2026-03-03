/*
  # Create Work Sessions and Pauses Tables

  1. New Tables
    - `work_sessions`
      - `id` (uuid, primary key) - Unique identifier for each work session
      - `started_at` (timestamptz) - When the session started
      - `ended_at` (timestamptz, nullable) - When the session ended
      - `total_pauses` (int) - Count of pauses taken during the session
      - `created_at` (timestamptz) - Record creation timestamp
    
    - `pauses`
      - `id` (uuid, primary key) - Unique identifier for each pause
      - `session_id` (uuid, foreign key) - Links to the parent work session
      - `need_category` (text) - The type of need (calm, energy, reset_attention, body)
      - `activity_prompt` (text) - The micro-break activity that was shown
      - `duration_seconds` (int) - How long the pause lasted
      - `rating` (int, nullable) - User's rating of how restorative the pause was (1-5)
      - `started_at` (timestamptz) - When the pause started
      - `completed_at` (timestamptz, nullable) - When the pause was completed
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on both tables
    - For MVP without auth: Allow all operations from anon role
    - Note: In production, these policies should be restricted to authenticated users

  3. Notes
    - The need_category uses text type for flexibility
    - Rating is nullable to allow for skipped feedback
    - Foreign key ensures referential integrity between pauses and sessions
*/

CREATE TABLE IF NOT EXISTS work_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  total_pauses int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pauses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES work_sessions(id) ON DELETE CASCADE,
  need_category text NOT NULL,
  activity_prompt text NOT NULL,
  duration_seconds int NOT NULL DEFAULT 0,
  rating int CHECK (rating >= 1 AND rating <= 5),
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pauses_session_id ON pauses(session_id);
CREATE INDEX IF NOT EXISTS idx_work_sessions_started_at ON work_sessions(started_at DESC);

ALTER TABLE work_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pauses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon to select work_sessions"
  ON work_sessions FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anon to insert work_sessions"
  ON work_sessions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon to update work_sessions"
  ON work_sessions FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anon to delete work_sessions"
  ON work_sessions FOR DELETE
  TO anon
  USING (true);

CREATE POLICY "Allow anon to select pauses"
  ON pauses FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anon to insert pauses"
  ON pauses FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon to update pauses"
  ON pauses FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anon to delete pauses"
  ON pauses FOR DELETE
  TO anon
  USING (true);
