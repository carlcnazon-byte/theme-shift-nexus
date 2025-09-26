import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://icybuplkenjblvhuqztc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljeWJ1cGxrZW5qYmx2aHVxenRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMzM0MjIsImV4cCI6MjA2NjkwOTQyMn0.cmFMiZ6KtunQmUIX2K_amUCXgpUrr3e-jsNUIHayaO0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});