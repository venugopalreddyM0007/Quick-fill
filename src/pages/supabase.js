import { createClient } from '@supabase/supabase-js';
import secrets from '../../secrets.development';

const supabaseUrl = secrets.VITE_SUPABASE_URL;
const supabaseAnonKey = secrets.VITE_SUPABASE_ANON_KEY;

const storageAdapter = {
  getItem: async (key) => {
    const data = await chrome.storage.local.get(key);
    return data[key] || null;
  },
  setItem: async (key, value) => {
    await chrome.storage.local.set({ [key]: value });
  },
  removeItem: async (key) => {
    await chrome.storage.local.remove(key);
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { storage: storageAdapter },
});
