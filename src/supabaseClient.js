import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://hiixoghiksqmqrngxhlz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpaXhvZ2hpa3NxbXFybmd4aGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MjA1NjAsImV4cCI6MjA3NDk5NjU2MH0.Mz7uh2oAFRk4vD1R87ndgOIGA14yOvpZfAE687KywQw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);