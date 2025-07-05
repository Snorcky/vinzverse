/*
  # Création de l'utilisateur administrateur principal

  1. Création du compte administrateur
    - Email: gillaux.vincent@gmail.com
    - Mot de passe: Vv128zqsd8/*
    - Rôle: admin

  2. Profil administrateur
    - Nom complet: Vincent Gillaux
    - Titre: Growth Marketer & Développeur
    - Bio par défaut
*/

-- Insérer l'utilisateur administrateur
-- Note: Le mot de passe sera défini lors de la première connexion via Supabase Auth
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'gillaux.vincent@gmail.com',
  crypt('Vv128zqsd8/*', gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Créer l'entrée correspondante dans la table users
INSERT INTO public.users (id, email, role)
SELECT 
  id,
  email,
  'admin'::user_role
FROM auth.users 
WHERE email = 'gillaux.vincent@gmail.com';

-- Créer le profil administrateur
INSERT INTO public.profiles (user_id, full_name, title, bio)
SELECT 
  id,
  'Vincent Gillaux',
  'Growth Marketer & Développeur',
  'Passionné par l''optimisation de la croissance et le développement web, je combine stratégie marketing et compétences techniques pour créer des solutions innovantes et performantes.'
FROM auth.users 
WHERE email = 'gillaux.vincent@gmail.com';