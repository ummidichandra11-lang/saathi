'use client';

import React, { useState, useEffect } from 'react';
import { SupportedLanguage, UserProfile, SchemeMatch, Scheme } from '../types';
import { translations } from '../lib/i18n';
import { INITIAL_SCHEMES } from '../data/schemes';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

import { Header } from '../components/Header';
import { VoiceIntake } from '../components/VoiceIntake';
import { ProfileReviewModal } from '../components/ProfileReviewModal';
import { SchemeCard } from '../components/SchemeCard';
import { ChecklistDrawer } from '../components/ChecklistDrawer';
import { DocumentVerificationModal } from '../components/DocumentVerificationModal';
import { DeadlinesHub } from '../components/DeadlinesHub';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

import {
  Sparkles,
  Filter,
  CheckCircle,
  FileCheck2,
  Calendar,
  Camera,
  RefreshCw,
  Search,
  ArrowUpDown,
} from 'lucide-react';

export default function HomePage() {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [matches, setMatches] = useState<SchemeMatch[]>([]);
  const [allSchemes, setAllSchemes] = useState<Scheme[]>(INITIAL_SCHEMES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeChecklistScheme, setActiveChecklistScheme] = useState<Scheme | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isDeadlinesOpen, setIsDeadlinesOpen] = useState(false);

  // Loading & error state
  const [isExtracting, setIsExtracting] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const t = translations[language];
  const { speak, stop, isSpeaking, currentText } = useSpeechSynthesis();

  // Load all schemes on mount
  useEffect(() => {
    async function loadSchemes() {
      try {
        const res = await fetch('/api/schemes');
        const data = await res.json();
        if (data.success && data.schemes) {
          setAllSchemes(data.schemes);
        }
      } catch (e) {
        // Fallback already preset in state
      }
    }
    loadSchemes();
  }, []);

  // 1. Handle user intake submission (from voice or text input)
  const handleIntakeSubmit = async (textInput: string) => {
    setIsExtracting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/extract-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: textInput, language }),
      });

      const data = await res.json();
      if (data.success && data.profile) {
        setUserProfile(data.profile);
        setIsProfileModalOpen(true);
      } else {
        setErrorMessage(data.error || 'Could not understand profile. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error extracting profile.');
    } finally {
      setIsExtracting(false);
    }
  };

  // 2. Handle confirmed profile -> run scheme matching
  const handleConfirmProfile = async (confirmedProfile: UserProfile) => {
    setUserProfile(confirmedProfile);
    setIsProfileModalOpen(false);
    setIsMatching(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/match-schemes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: confirmedProfile,
          language,
        }),
      });

      const data = await res.json();
      if (data.success && data.matches) {
        setMatches(data.matches);
        // Smooth scroll down to results
        setTimeout(() => {
          document.getElementById('matches-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setErrorMessage(data.error || 'Failed to match schemes.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error during scheme matching.');
    } finally {
      setIsMatching(false);
    }
  };

  // Filter schemes according to selected category & search
  const displayedMatches = matches.filter((m) => {
    const matchesCategory = selectedCategory === 'all' || m.scheme.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      m.scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Navigation Header */}
      <Header
        language={language}
        onLanguageChange={(newLang) => {
          setLanguage(newLang);
          stop();
        }}
        onOpenDeadlines={() => setIsDeadlinesOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* Hero & Voice Intake */}
        <VoiceIntake
          language={language}
          onSubmit={handleIntakeSubmit}
          isLoading={isExtracting || isMatching}
        />

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="max-w-4xl mx-auto px-4 my-4">
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold flex items-center justify-between">
              <span>{errorMessage}</span>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-xs uppercase font-extrabold text-rose-600 hover:text-rose-900"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Active Profile Status Bar (Shown once a profile is confirmed) */}
        {userProfile && (
          <section className="max-w-5xl mx-auto px-4 mb-8">
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-saathi-greenLight text-saathi-greenDark flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Active Verified Citizen Profile
                  </span>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    <span className="font-extrabold text-saathi-navy capitalize">
                      {userProfile.occupation || 'Citizen'}
                    </span>
                    {userProfile.age && (
                      <span className="text-xs bg-slate-100 font-bold px-2 py-0.5 rounded-full text-slate-700">
                        {userProfile.age} yrs
                      </span>
                    )}
                    {userProfile.land_acres !== undefined && (
                      <span className="text-xs bg-amber-50 font-bold px-2 py-0.5 rounded-full text-amber-800">
                        {userProfile.land_acres} Acres
                      </span>
                    )}
                    {userProfile.state && (
                      <span className="text-xs bg-blue-50 font-bold px-2 py-0.5 rounded-full text-blue-800">
                        {userProfile.state}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsDocModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs sm:text-sm font-bold transition shadow-sm"
                >
                  <Camera className="w-4 h-4 text-saathi-saffron" />
                  <span>{t.verifyDocButton}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-saathi-navy text-xs sm:text-sm font-bold transition"
                >
                  {t.editProfile}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Scheme Results Section */}
        {matches.length > 0 && (
          <section id="matches-section" className="max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-24">
            {/* Header & Filter Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-saathi-saffron flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Eligibility Intelligence</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-saathi-navy">
                  {t.matchesFoundTitle} ({displayedMatches.length})
                </h2>
              </div>

              {/* Category Filter Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: t.filterAll },
                  { id: 'farmer', label: t.filterFarmer },
                  { id: 'student', label: t.filterStudent },
                  { id: 'women', label: t.filterWomen },
                  { id: 'senior', label: t.filterSenior },
                  { id: 'health', label: t.filterHealth },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm ${
                      selectedCategory === cat.id
                        ? 'bg-saathi-navy text-white shadow-md'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scheme Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedMatches.map((match) => (
                <SchemeCard
                  key={match.scheme.id}
                  match={match}
                  language={language}
                  onOpenChecklist={() => setActiveChecklistScheme(match.scheme)}
                  onVerifyDocument={() => setIsDocModalOpen(true)}
                  onSpeak={(text) => speak(text, language)}
                  onStopSpeak={stop}
                  isSpeakingThis={Boolean(isSpeaking && currentText?.includes(match.scheme.name))}
                />
              ))}
            </div>
          </section>
        )}

        {/* Default All-Schemes Catalog (Shown before user performs first search) */}
        {matches.length === 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-saathi-navy">
                  Verified Government Schemes Directory (18 Schemes)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Real, accurate central and state schemes across agriculture, scholarships, maternity, health & pensions.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsDeadlinesOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                <Calendar className="w-4 h-4 text-saathi-saffron" />
                <span>View All Deadlines</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {allSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 mb-2 inline-block">
                      {scheme.category}
                    </span>
                    <h4 className="text-base font-extrabold text-saathi-navy leading-snug">
                      {scheme.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                      {scheme.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveChecklistScheme(scheme)}
                      className="text-xs font-extrabold text-saathi-navy hover:text-saathi-saffron transition flex items-center gap-1"
                    >
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>Required Docs & Steps</span>
                    </button>

                    <a
                      href={scheme.official_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-saathi-saffron hover:underline"
                    >
                      Official Portal →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Interactive Modals & Drawers */}
      {userProfile && (
        <ProfileReviewModal
          language={language}
          profile={userProfile}
          isOpen={isProfileModalOpen}
          onConfirm={handleConfirmProfile}
          onClose={() => setIsProfileModalOpen(false)}
          isLoading={isMatching}
        />
      )}

      <ChecklistDrawer
        scheme={activeChecklistScheme}
        language={language}
        isOpen={!!activeChecklistScheme}
        onClose={() => setActiveChecklistScheme(null)}
      />

      <DocumentVerificationModal
        language={language}
        profile={userProfile || undefined}
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
      />

      <DeadlinesHub
        schemes={allSchemes}
        language={language}
        isOpen={isDeadlinesOpen}
        onClose={() => setIsDeadlinesOpen(false)}
      />

      {/* Statutory Civic Disclaimer Footer */}
      <DisclaimerBanner language={language} />
    </div>
  );
}
