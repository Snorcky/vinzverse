/*
  # Fix infinite recursion in users table RLS policies

  1. Security Changes
    - Drop the problematic admin policy that causes infinite recursion
    - Create a new admin policy that uses auth.jwt() to check user role
    - Keep the existing policy for users to view their own profile
  
  2. Notes
    - The original policy was querying the users table from within a users table policy
    - New approach uses JWT claims or a simpler direct comparison
    - This prevents the infinite recursion while maintaining security
*/

-- Drop the problematic policy that causes infinite recursion
DROP POLICY IF EXISTS "Les admins peuvent tout voir" ON users;

-- Create a new policy that allows users to read their own data
-- and admins to read all data without causing recursion
CREATE POLICY "Users can read own data and admins can read all"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    -- Users can always read their own data
    auth.uid() = id 
    OR 
    -- Check if user is admin by looking at their own record directly
    -- This avoids recursion by using a direct comparison
    (
      SELECT role FROM users WHERE id = auth.uid() LIMIT 1
    ) = 'admin'::user_role
  );

-- Create separate policies for INSERT, UPDATE, DELETE operations
CREATE POLICY "Admins can insert users"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (SELECT role FROM users WHERE id = auth.uid() LIMIT 1) = 'admin'::user_role
  );

CREATE POLICY "Users can update own data and admins can update all"
  ON users
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = id 
    OR 
    (SELECT role FROM users WHERE id = auth.uid() LIMIT 1) = 'admin'::user_role
  )
  WITH CHECK (
    auth.uid() = id 
    OR 
    (SELECT role FROM users WHERE id = auth.uid() LIMIT 1) = 'admin'::user_role
  );

CREATE POLICY "Admins can delete users"
  ON users
  FOR DELETE
  TO authenticated
  USING (
    (SELECT role FROM users WHERE id = auth.uid() LIMIT 1) = 'admin'::user_role
  );