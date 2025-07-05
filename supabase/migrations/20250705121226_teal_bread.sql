/*
  # Schéma initial pour le portfolio de Vincent Gillaux

  1. Nouvelles tables
    - `users` 
      - `id` (uuid, clé primaire)
      - `email` (texte, unique)
      - `role` (enum: admin, moderator)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `menu_sections`
      - `id` (uuid, clé primaire)
      - `title` (texte)
      - `slug` (texte, unique)
      - `content` (texte)
      - `order_index` (integer)
      - `is_active` (boolean)
      - `background_color` (enum: white, black)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `contact_messages`
      - `id` (uuid, clé primaire)
      - `name` (texte)
      - `email` (texte)
      - `subject` (texte)
      - `message` (texte)
      - `is_read` (boolean)
      - `created_at` (timestamp)
    
    - `profiles`
      - `id` (uuid, clé primaire)
      - `user_id` (uuid, référence users)
      - `full_name` (texte)
      - `title` (texte)
      - `bio` (texte)
      - `profile_image_url` (texte)
      - `social_links` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Sécurité
    - Activation de RLS sur toutes les tables
    - Politiques d'accès basées sur les rôles
    - Authentification requise pour l'administration
    - Accès public pour les sections actives et le formulaire de contact

  3. Données initiales
    - Utilisateur administrateur principal
    - Sections par défaut du portfolio
*/

-- Créer les types enum
CREATE TYPE user_role AS ENUM ('admin', 'moderator');
CREATE TYPE background_color AS ENUM ('white', 'black');

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'moderator',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des sections du menu
CREATE TABLE IF NOT EXISTS menu_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text DEFAULT '',
  order_index integer NOT NULL,
  is_active boolean DEFAULT true,
  background_color background_color DEFAULT 'white',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des messages de contact
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Table des profils utilisateurs
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  full_name text DEFAULT '',
  title text DEFAULT '',
  bio text DEFAULT '',
  profile_image_url text,
  social_links jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_sections_updated_at BEFORE UPDATE ON menu_sections
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Activer RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Politiques pour users
CREATE POLICY "Les utilisateurs peuvent voir leur propre profil"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Les admins peuvent tout voir"
  ON users FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Politiques pour menu_sections
CREATE POLICY "Lecture publique des sections actives"
  ON menu_sections FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Les utilisateurs authentifiés peuvent modifier les sections"
  ON menu_sections FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Politiques pour contact_messages
CREATE POLICY "Insertion publique des messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Les utilisateurs authentifiés peuvent lire les messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Les utilisateurs authentifiés peuvent modifier les messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Politiques pour profiles
CREATE POLICY "Les utilisateurs peuvent voir leur propre profil"
  ON profiles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Les utilisateurs peuvent modifier leur propre profil"
  ON profiles FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Insérer les sections par défaut
INSERT INTO menu_sections (title, slug, content, order_index, background_color) VALUES
  ('Mes expériences', 'mes-experiences', '', 1, 'white'),
  ('Mes formations', 'mes-formations', '', 2, 'black'),
  ('Mes compétences', 'mes-competences', '', 3, 'white'),
  ('Mes hobbies', 'mes-hobbies', '', 4, 'black'),
  ('Contact', 'contact', '', 5, 'white');

-- Fonction pour créer un utilisateur après l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (new.id, new.email, 'moderator');
  
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'full_name', ''));
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer automatiquement un utilisateur après l'inscription
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();