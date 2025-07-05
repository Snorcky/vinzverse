/*
  # Fix infinite recursion in users table RLS policies

  1. Problem
    - Current policies on users table are causing infinite recursion
    - Policies are querying the users table to check roles, creating circular dependency
    - This prevents any queries involving users table from working

  2. Solution
    - Drop existing problematic policies
    - Create new simplified policies that avoid recursion
    - Use auth.uid() directly without additional user table lookups where possible
    - Separate admin checks into a function to avoid recursion

  3. Changes
    - Drop all existing policies on users table
    - Create new non-recursive policies
    - Users can read their own data
    - Users can update their own data
    - Only allow inserts through registration (handled by Supabase Auth)
    - Admin operations will be handled through service role or separate admin interface
*/

-- Drop all existing policies on users table to start fresh
DROP POLICY IF EXISTS "Admins can delete users" ON users;
DROP POLICY IF EXISTS "Admins can insert users" ON users;
DROP POLICY IF EXISTS "Les utilisateurs peuvent voir leur propre profil" ON users;
DROP POLICY IF EXISTS "Users can read own data and admins can read all" ON users;
DROP POLICY IF EXISTS "Users can update own data and admins can update all" ON users;

-- Create simple, non-recursive policies
-- Users can read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can update their own data (but not role)
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM users WHERE id = auth.uid()));

-- Allow user registration (insert) - this will be handled by Supabase Auth triggers
CREATE POLICY "Allow user registration"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Note: Admin operations should be handled through the service role key
-- or through a separate admin interface that uses elevated permissions