export type SchemeCategory = 'student' | 'farmer' | 'women' | 'senior' | 'health';

export interface EligibilityRules {
  min_age?: number;
  max_age?: number;
  max_income?: number; // Annual income in INR (e.g., 200000 = 2 Lakhs)
  occupations?: string[];
  states?: string[]; // ['All'] or specific states
  genders?: string[]; // ['all', 'female', 'male']
  max_land_acres?: number;
  education_level?: string[];
  caste_categories?: string[];
  conditions_summary: string;
}

export interface Scheme {
  id: string;
  name: string;
  category: SchemeCategory;
  description: string;
  eligibility_rules: EligibilityRules;
  required_documents: string[];
  application_steps: string[];
  official_url: string;
  deadline: string; // e.g. "Ongoing (No deadline)", "Annual cycle: Closes 31st August"
  where_to_get_documents?: Record<string, string>;
}

export interface UserProfile {
  name?: string;
  age?: number;
  occupation?: string; // 'farmer', 'student', 'daily_wage', 'unemployed', 'self_employed', etc.
  annual_income?: number;
  state?: string;
  gender?: 'male' | 'female' | 'other' | 'all';
  land_acres?: number;
  education_level?: string;
  caste_category?: string;
  family_details?: string;
  missing_critical_info?: string[];
  raw_query?: string;
}

export type MatchStatus = 'likely_eligible' | 'potential_eligible';

export interface SchemeMatch {
  scheme: Scheme;
  status: MatchStatus;
  explanation: {
    en: string;
    hi: string;
    te: string;
  };
  matched_reasons: string[];
  unmet_or_pending_criteria: string[];
}

export type SupportedLanguage = 'en' | 'hi' | 'te';

export interface DocumentVerificationResult {
  document_type: string;
  is_authentic_format: boolean;
  legibility_status: 'clear' | 'partially_blurred' | 'unreadable';
  extracted_fields: {
    name?: string;
    dob_or_year?: string;
    gender?: string;
    state?: string;
    income_stated?: string;
    category_stated?: string;
  };
  profile_match_verdict: 'matches_profile' | 'mismatch_detected' | 'insufficient_profile_data';
  match_discrepancies: string[];
  recommendations: string[];
  privacy_notice: string;
}
