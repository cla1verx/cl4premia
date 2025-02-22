/*
  # Fix RLS policies for participants table

  1. Changes
    - Drop existing policies
    - Create simpler, more permissive policies for participants table
  
  2. Security
    - Allow public inserts without complex validation
    - Maintain read and delete restrictions to authenticated users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable public registration" ON participants;
DROP POLICY IF EXISTS "Allow admins to view participants" ON participants;
DROP POLICY IF EXISTS "Allow admins to delete participants" ON participants;

-- Create new simplified policies
CREATE POLICY "public_insert_policy"
  ON participants
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "authenticated_select_policy"
  ON participants
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_delete_policy"
  ON participants
  FOR DELETE
  TO authenticated
  USING (true);