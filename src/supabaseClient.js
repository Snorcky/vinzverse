import { createClient } from '@supabase/supabase-js';

// Récupère les variables d'environnement
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Crée une instance de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
