import { createClient } from '@supabase/supabase-js';
import { Scheme } from '../types';
import { INITIAL_SCHEMES } from '../data/schemes';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * Fetch schemes from Supabase with automatic zero-downtime fallback to verified in-memory dataset
 */
export async function getSchemes(category?: string): Promise<Scheme[]> {
  if (supabase) {
    try {
      let query = supabase.from('schemes').select('*');
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as Scheme[];
      }
    } catch (err) {
      console.warn('Supabase query failed, falling back to local dataset:', err);
    }
  }

  // Resilient fallback
  if (category && category !== 'all') {
    return INITIAL_SCHEMES.filter((s) => s.category === category);
  }
  return INITIAL_SCHEMES;
}

export async function getSchemeById(id: string): Promise<Scheme | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('schemes')
        .select('*')
        .eq('id', id)
        .single();
      if (!error && data) {
        return data as Scheme;
      }
    } catch (err) {
      console.warn(`Supabase query for ${id} failed, falling back:`, err);
    }
  }

  const found = INITIAL_SCHEMES.find((s) => s.id === id);
  return found || null;
}
