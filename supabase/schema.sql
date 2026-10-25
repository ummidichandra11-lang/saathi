-- =========================================================================
-- Saathi: AI-Powered Government Scheme Discovery Platform
-- Supabase Postgres Schema
-- =========================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SCHEMES TABLE
CREATE TABLE IF NOT EXISTS public.schemes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('student', 'farmer', 'women', 'senior', 'health')),
    description TEXT NOT NULL,
    eligibility_rules JSONB NOT NULL DEFAULT '{}'::jsonb,
    required_documents TEXT[] NOT NULL DEFAULT '{}',
    application_steps TEXT[] NOT NULL DEFAULT '{}',
    official_url TEXT NOT NULL,
    deadline TEXT NOT NULL,
    where_to_get_documents JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for category searches & JSONB queries
CREATE INDEX IF NOT EXISTS idx_schemes_category ON public.schemes (category);
CREATE INDEX IF NOT EXISTS idx_schemes_eligibility ON public.schemes USING gin (eligibility_rules);

-- 2. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all verified schemes
DROP POLICY IF EXISTS "Public can view schemes" ON public.schemes;
CREATE POLICY "Public can view schemes" 
ON public.schemes FOR SELECT 
USING (true);

-- Allow service role full write access
DROP POLICY IF EXISTS "Service role full access on schemes" ON public.schemes;
CREATE POLICY "Service role full access on schemes" 
ON public.schemes FOR ALL 
USING (true)
WITH CHECK (true);

-- 3. UPDATED AT TRIGGER
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_updated_at ON public.schemes;
CREATE TRIGGER trigger_set_updated_at
BEFORE UPDATE ON public.schemes
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();
