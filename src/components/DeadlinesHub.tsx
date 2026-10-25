'use client';

import React from 'react';
import { Scheme, SupportedLanguage } from '../types';
import { translations } from '../lib/i18n';
import { Calendar, Clock, ExternalLink, AlertCircle, X } from 'lucide-react';

interface DeadlinesHubProps {
  schemes: Scheme[];
  language: SupportedLanguage;
  isOpen: boolean;
  onClose: () => void;
}

export const DeadlinesHub: React.FC<DeadlinesHubProps> = ({
  schemes,
  language,
  isOpen,
  onClose,
}) => {
  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-saathi-navy to-slate-800 text-white p-5 sm:p-6 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Active Government Calender</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {t.deadlinesTitle}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            {t.deadlinesSubtitle}
          </p>
        </div>

        {/* Schemes List with Deadlines */}
        <div className="p-5 sm:p-6 overflow-y-auto divide-y divide-slate-100">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 mb-1 inline-block">
                  {scheme.category}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-saathi-navy">
                  {scheme.name}
                </h4>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-saathi-saffronDark font-semibold">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{scheme.deadline}</span>
                </div>
              </div>

              <a
                href={scheme.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-saathi-navy transition shrink-0"
                title="Go to Official Portal"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-saathi-navy text-white text-xs sm:text-sm font-extrabold hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
