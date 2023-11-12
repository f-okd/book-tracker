import { createClient } from '@supabase/supabase-js';

// todo: add types
const supabaseUrl = import.meta.env.VITE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
