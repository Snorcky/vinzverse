/*
  # Create portfolio database tables

  1. New Tables
    - `sessions` - Stores authentication sessions
    - `profiles` - User profiles for admin access
    - `sections` - Content sections of the portfolio
    - `content_blocks` - Content blocks within sections
    - `navigation_items` - Navigation menu items
    - `contact_messages` - Messages from the contact form
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin access
*/

-- Profiles table (for admin users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  token TEXT UNIQUE NOT NULL
);

-- Sections table
CREATE TABLE IF NOT EXISTS sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  order_number INTEGER NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Content blocks table
CREATE TABLE IF NOT EXISTS content_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES sections(id) NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  media_url TEXT,
  start_date TEXT,
  end_date TEXT,
  order_number INTEGER NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Navigation items table
CREATE TABLE IF NOT EXISTS navigation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  order_number INTEGER NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admins)
-- Allow admins to read their own profile
CREATE POLICY "Admins can read their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Allow admins to read sessions
CREATE POLICY "Admins can read sessions"
  ON sessions FOR SELECT
  USING (auth.uid() = user_id);

-- Allow admins to manage content
CREATE POLICY "Admins can read all sections"
  ON sections FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert sections"
  ON sections FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update sections"
  ON sections FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admins can delete sections"
  ON sections FOR DELETE
  TO authenticated
  USING (true);

-- Allow admins to manage content blocks
CREATE POLICY "Admins can read all content blocks"
  ON content_blocks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert content blocks"
  ON content_blocks FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update content blocks"
  ON content_blocks FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admins can delete content blocks"
  ON content_blocks FOR DELETE
  TO authenticated
  USING (true);

-- Allow admins to manage navigation
CREATE POLICY "Admins can read navigation items"
  ON navigation_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert navigation items"
  ON navigation_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update navigation items"
  ON navigation_items FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admins can delete navigation items"
  ON navigation_items FOR DELETE
  TO authenticated
  USING (true);

-- Allow admins to read contact messages
CREATE POLICY "Admins can read contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update contact messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admins can delete contact messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);

-- Allow public to read visible sections and content
CREATE POLICY "Public can read visible sections"
  ON sections FOR SELECT
  USING (is_visible = true);

CREATE POLICY "Public can read visible content blocks"
  ON content_blocks FOR SELECT
  USING (is_visible = true);

CREATE POLICY "Public can read visible navigation items"
  ON navigation_items FOR SELECT
  USING (is_visible = true);

-- Allow public to submit contact messages
CREATE POLICY "Public can insert contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Insert initial admin user (with a default password that should be changed)
INSERT INTO profiles (email, password)
VALUES ('admin@example.com', '$2a$10$iCljUqvzAwMcWvJUI1TdNeoFIxoIz2Ri9TScPw3OuT6jZVLBsYlIq')
ON CONFLICT (email) DO NOTHING;

-- Insert default sections
INSERT INTO sections (name, title, subtitle, order_number, is_visible)
VALUES 
  ('about', 'À Propos de Moi', 'Découvrez qui je suis', 1, true),
  ('experience', 'Mon Expérience', 'Mon parcours professionnel', 2, true),
  ('education', 'Ma Formation', 'Mon parcours académique', 3, true),
  ('skills', 'Compétences & Outils', 'Ce que je maîtrise', 4, true),
  ('hobbies', 'Mes Loisirs', 'Ce qui me passionne', 5, true),
  ('projects', 'Projets Actuels', 'Sur quoi je travaille', 6, true),
  ('contact', 'Contact', 'Prenez contact avec moi', 7, true)
ON CONFLICT DO NOTHING;

-- Insert default navigation items
INSERT INTO navigation_items (name, url, order_number, is_visible)
VALUES 
  ('Accueil', '#home', 1, true),
  ('À Propos', '#about', 2, true),
  ('Expérience', '#experience', 3, true),
  ('Formation', '#education', 4, true), 
  ('Compétences', '#skills', 5, true),
  ('Loisirs', '#hobbies', 6, true),
  ('Projets', '#projects', 7, true),
  ('Contact', '#contact', 8, true)
ON CONFLICT DO NOTHING;