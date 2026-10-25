'use client';

import React from 'react';
import { SupportedLanguage } from '../types';
import { translations } from '../lib/i18n';
import { Sparkles, PhoneCall, Globe, CheckCircle2, FileText, Calendar } from 'lucide-react';

interface HeaderProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenDeadlines?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onOpenDeadlines,
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-saathi-border shadow-sm">
      {/* Top Civic Helpline Bar */}
      <div className="bg-saathi-navy text-white text-xs py-1.5 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>National Public Grievances & Welfare Portal Guide</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="hidden sm:inline">Kisan Helpline: <strong className="text-white">1800-180-1551</strong></span>
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-saathi-saffron" />
              <span>National Toll-Free: <strong className="text-white">1800-11-0031</strong></span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saathi-saffron to-saathi-saffronDark flex items-center justify-center shadow-md shadow-saathi-saffron/20 text-white font-bold text-xl">
            स
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-saathi-navy">
                Saathi
              </span>
              <span className="text-sm font-semibold text-saathi-saffron bg-saathi-saffronLight px-2 py-0.5 rounded-full border border-saathi-saffron/30">
                साथी • సాథి
              </span>
            </div>
            <p className="text-xs text-saathi-subtext hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls & Language Switcher */}
        <div className="flex items-center gap-3">
          {onOpenDeadlines && (
            <button
              onClick={onOpenDeadlines}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-saathi-navy hover:bg-slate-50 transition"
              title="View Upcoming Deadlines"
            >
              <Calendar className="w-4 h-4 text-saathi-saffron" />
              <span>Deadlines</span>
            </button>
          )}

          {/* Multilingual Selector */}
          <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 shadow-inner">
            <Globe className="w-4 h-4 text-slate-500 ml-1.5 mr-1 hidden xs:block" />
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-white text-saathi-navy shadow-sm'
                  : 'text-slate-600 hover:text-saathi-navy'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2.5 py-1 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                language === 'hi'
                  ? 'bg-white text-saathi-saffronDark shadow-sm'
                  : 'text-slate-600 hover:text-saathi-navy'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => onLanguageChange('te')}
              className={`px-2.5 py-1 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                language === 'te'
                  ? 'bg-white text-saathi-greenDark shadow-sm'
                  : 'text-slate-600 hover:text-saathi-navy'
              }`}
            >
              తెలుగు
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
