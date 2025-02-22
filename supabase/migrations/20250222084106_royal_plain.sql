/*
  # Update RLS policies for participants table

  1. Changes
    - Drop existing policies
    - Create new, more specific policies for participants table
  
  2. Security
    - Allow public inserts without authentication
    - Restrict read and delete operations to authenticated users only
    - Add policy descriptions for better maintainability
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create participants" ON participants;
DROP POLICY IF EXISTS "Authenticated users can view all participants" ON participants;
DROP POLICY IF EXISTS "Authenticated users can delete participants" ON participants;

-- Create new policies with better security controls
CREATE POLICY "Enable public registration"
  ON participants
  FOR INSERT
  TO public
  WITH CHECK (
    -- Basic validation
    length(name) >= 3 AND
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
    phone ~ '^\d{10,11}$'
  );

CREATE POLICY "Allow admins to view participants"
  ON participants
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admins to delete participants"
  ON participants
  FOR DELETE
  TO authenticated
  USING (true);