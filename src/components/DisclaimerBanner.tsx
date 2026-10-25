'use client';

import React from 'react';
import { SupportedLanguage } from '../types';
import { translations } from '../lib/i18n';
import { AlertCircle, ShieldAlert, ExternalLink, HeartHandshake } from 'lucide-react';

interface DisclaimerBannerProps {
  language: SupportedLanguage;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ language }) => {
  const t = translations[language];

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50 py-10 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Statutory Civic Disclaimer */}
        <div className="rounded-2xl bg-amber-50/80 border border-amber-200/90 p-4 text-xs sm:text-sm text-amber-900 flex items-start sm:items-center justify-center gap-3 text-left">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed font-medium">
            <strong>Civic Notice:</strong> {t.disclaimerText}
          </p>
        </div>

        {/* Official Portals Direct Directory */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-600 pt-2">
          <a
            href="https://www.india.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-saathi-saffron transition flex items-center gap-1"
          >
            <span>National Portal of India (india.gov.in)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>•</span>
          <a
            href="https://www.myscheme.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-saathi-saffron transition flex items-center gap-1"
          >
            <span>myScheme Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>•</span>
          <a
            href="https://scholarships.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-saathi-saffron transition flex items-center gap-1"
          >
            <span>National Scholarship Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>•</span>
          <a
            href="https://pmkisan.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-saathi-saffron transition flex items-center gap-1"
          >
            <span>PM-KISAN Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="pt-4 border-t border-slate-200/60 text-xs text-slate-400 flex items-center justify-center gap-2">
          <span>Saathi (साथी / సాథి) • Built for Digital India Public Welfare</span>
        </div>
      </div>
    </footer>
  );
};
