/*
  # Create Admin User

  1. Admin User Creation
    - Creates admin user in auth.users if not exists
    - Creates corresponding entry in public.users table
    - Creates admin profile with default information
  
  2. Security
    - Uses proper conflict handling to avoid duplicate key errors
    - Ensures data consistency between auth and public tables
*/

-- Create admin user in auth.users table if not exists
DO $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Check if user already exists
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = 'gillaux.vincent@gmail.com';
    
    -- If user doesn't exist, create it
    IF admin_user_id IS NULL THEN
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
        ) RETURNING id INTO admin_user_id;
    END IF;
    
    -- Create or update entry in public.users table
    INSERT INTO public.users (id, email, role)
    VALUES (admin_user_id, 'gillaux.vincent@gmail.com', 'admin'::user_role)
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        role = EXCLUDED.role,
        updated_at = now();
    
    -- Create or update profile
    INSERT INTO public.profiles (user_id, full_name, title, bio)
    VALUES (
        admin_user_id,
        'Vincent Gillaux',
        'Growth Marketer & Développeur',
        'Passionné par l''optimisation de la croissance et le développement web, je combine stratégie marketing et compétences techniques pour créer des solutions innovantes et performantes.'
    )
    ON CONFLICT (user_id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        title = EXCLUDED.title,
        bio = EXCLUDED.bio,
        updated_at = now();
END $$;