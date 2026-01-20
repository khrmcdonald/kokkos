-- KOKKOS Database Schema
-- Run this in Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE
-- Extends Supabase auth.users with additional user data
-- ============================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- ASSESSMENT RESULTS TABLE
-- Stores completed assessment results
-- ============================================
CREATE TABLE public.assessment_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_type TEXT NOT NULL CHECK (assessment_type IN ('seven-seeds', 'the-balance', 'the-compass')),
  gender TEXT CHECK (gender IN ('male', 'female')),
  answers JSONB NOT NULL,
  scores JSONB NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Anonymous results (no user_id) are allowed for users who don't sign up
  CONSTRAINT valid_result CHECK (answers IS NOT NULL AND scores IS NOT NULL)
);

-- Create index for faster queries
CREATE INDEX idx_assessment_results_user_id ON public.assessment_results(user_id);
CREATE INDEX idx_assessment_results_type ON public.assessment_results(assessment_type);
CREATE INDEX idx_assessment_results_completed_at ON public.assessment_results(completed_at);

-- Enable RLS
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;

-- Assessment results policies
CREATE POLICY "Users can view own results" 
  ON public.assessment_results FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own results" 
  ON public.assessment_results FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anon users can insert results" 
  ON public.assessment_results FOR INSERT 
  WITH CHECK (user_id IS NULL);

-- ============================================
-- EMAIL SUBSCRIBERS TABLE
-- Newsletter signups
-- ============================================
CREATE TABLE public.email_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  source TEXT DEFAULT 'website',
  
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create index for email lookups
CREATE INDEX idx_email_subscribers_email ON public.email_subscribers(email);

-- Enable RLS
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- Email subscribers policies (allow inserts from anyone, selects only for service role)
CREATE POLICY "Anyone can subscribe" 
  ON public.email_subscribers FOR INSERT 
  WITH CHECK (true);

-- ============================================
-- CONTACT MESSAGES TABLE
-- Stores contact form submissions
-- ============================================
CREATE TABLE public.contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ,
  
  CONSTRAINT valid_contact_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Contact messages policies
CREATE POLICY "Anyone can submit contact form" 
  ON public.contact_messages FOR INSERT 
  WITH CHECK (true);

-- ============================================
-- ADMIN VIEWS (for analytics dashboard)
-- ============================================

-- View for daily signups
CREATE OR REPLACE VIEW public.daily_signups AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as signups
FROM public.profiles
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- View for assessment completion stats
CREATE OR REPLACE VIEW public.assessment_stats AS
SELECT 
  assessment_type,
  COUNT(*) as total_completed,
  COUNT(CASE WHEN user_id IS NOT NULL THEN 1 END) as logged_in_users,
  COUNT(CASE WHEN user_id IS NULL THEN 1 END) as anonymous_users
FROM public.assessment_results
GROUP BY assessment_type;

-- View for daily assessment completions
CREATE OR REPLACE VIEW public.daily_assessments AS
SELECT 
  DATE(completed_at) as date,
  assessment_type,
  COUNT(*) as completions
FROM public.assessment_results
GROUP BY DATE(completed_at), assessment_type
ORDER BY date DESC;

-- ============================================
-- UPDATED_AT TRIGGER
-- Automatically update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
