import { createClient } from '@supabase/supabase-js';

// Default configuration provided by user
const FALLBACK_SUPABASE_URL = 'https://komiqlkmcswkghaibvef.supabase.co';
const FALLBACK_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvbWlxbGttY3N3a2doYWlidmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMDE5ODMsImV4cCI6MjA3OTY3Nzk4M30.qcXW0k_nxKRO0URDtLUztX932xedwOQv8g3ZJmF4ypE';

// Safely retrieve environment variables from Vite, Node environments, or localStorage
const getEnvVar = (key: string, viteKey: string, fallback: string): string => {
  try {
    // Check import.meta.env (Vite)
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[viteKey]) {
      // @ts-ignore
      return import.meta.env[viteKey] as string;
    }
  } catch (e) {
    // Ignore import.meta errors
  }

  try {
    // Check process.env (Standard/CRA)
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key]!;
    }
  } catch (e) {
    // Ignore process errors
  }

  // Check localStorage (Runtime fallback)
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(viteKey);
    if (stored) return stored;
  }
  return fallback;
};

const supabaseUrl = getEnvVar('SUPABASE_URL', 'VITE_SUPABASE_URL', FALLBACK_SUPABASE_URL);
const supabaseKey = getEnvVar('SUPABASE_ANON_KEY', 'VITE_SUPABASE_ANON_KEY', FALLBACK_SUPABASE_KEY);

// Only create the client if the configuration exists
export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

export const isSupabaseConfigured = () => !!supabase;

export const saveSupabaseConfig = (url: string, key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('VITE_SUPABASE_URL', url);
    localStorage.setItem('VITE_SUPABASE_ANON_KEY', key);
    window.location.reload();
  }
};

export const clearSupabaseConfig = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('VITE_SUPABASE_URL');
    localStorage.removeItem('VITE_SUPABASE_ANON_KEY');
    window.location.reload();
  }
};