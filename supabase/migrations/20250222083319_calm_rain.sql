/*
  # Create participants table

  1. New Tables
    - `participants`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, unique, not null)
      - `phone` (text, not null)
      - `created_at` (timestamptz, default: now())

  2. Security
    - Enable RLS on `participants` table
    - Add policies for:
      - Public can create new participants
      - Authenticated users can read all participants
      - Authenticated users can delete participants
*/

CREATE TABLE IF NOT EXISTS participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Allow public to create new participants
CREATE POLICY "Anyone can create participants"
  ON participants
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to read all participants
CREATE POLICY "Authenticated users can view all participants"
  ON participants
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to delete participants
CREATE POLICY "Authenticated users can delete participants"
  ON participants
  FOR DELETE
  TO authenticated
  USING (true);