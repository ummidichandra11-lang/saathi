'use client';

import React from 'react';
import { SchemeMatch, SupportedLanguage } from '../types';
import { translations } from '../lib/i18n';
import {
  CheckCircle,
  AlertTriangle,
  Volume2,
  VolumeX,
  ExternalLink,
  ListChecks,
  Camera,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface SchemeCardProps {
  match: SchemeMatch;
  language: SupportedLanguage;
  onOpenChecklist: () => void;
  onVerifyDocument: () => void;
  onSpeak: (text: string) => void;
  onStopSpeak: () => void;
  isSpeakingThis: boolean;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  match,
  language,
  onOpenChecklist,
  onVerifyDocument,
  onSpeak,
  onStopSpeak,
  isSpeakingThis,
}) => {
  const t = translations[language];
  const { scheme, status, explanation, matched_reasons, unmet_or_pending_criteria } = match;

  // Selected language explanation or fallback to English
  const currentExplanation = explanation[language] || explanation.en;

  const isLikely = status === 'likely_eligible';

  const categoryBadgeColors: Record<string, string> = {
    farmer: 'bg-amber-100 text-amber-800 border-amber-200',
    student: 'bg-blue-100 text-blue-800 border-blue-200',
    women: 'bg-rose-100 text-rose-800 border-rose-200',
    senior: 'bg-purple-100 text-purple-800 border-purple-200',
    health: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };

  const categoryLabels: Record<string, string> = {
    farmer: 'Agriculture / Farmer 🌾',
    student: 'Scholarship / Education 🎓',
    women: 'Women & Child Welfare 👩',
    senior: 'Senior Citizen / Pension 👴',
    health: 'Health & Housing 🏥',
  };

  const handleAudioToggle = () => {
    if (isSpeakingThis) {
      onStopSpeak();
    } else {
      const speechText = `${scheme.name}. ${currentExplanation}`;
      onSpeak(speechText);
    }
  };

  return (
    <article
      className={`rounded-3xl border-2 transition-all duration-300 shadow-md hover:shadow-xl bg-white overflow-hidden flex flex-col justify-between ${
        isLikely
          ? 'border-emerald-200/90 hover:border-emerald-400'
          : 'border-amber-200/90 hover:border-amber-400'
      }`}
    >
      {/* Top Banner with Badges */}
      <div className="p-5 sm:p-6 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          {/* Eligibility Verdict Badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold shadow-sm ${
              isLikely
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                : 'bg-amber-50 text-amber-800 border border-amber-300'
            }`}
          >
            {isLikely ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{t.likelyEligibleBadge}</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>{t.potentialEligibleBadge}</span>
              </>
            )}
          </div>

          {/* Category Tag */}
          <span
            className={`text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border ${
              categoryBadgeColors[scheme.category] || 'bg-slate-100 text-slate-700'
            }`}
          >
            {categoryLabels[scheme.category] || scheme.category}
          </span>
        </div>

        {/* Scheme Title */}
        <h3 className="text-xl sm:text-2xl font-black text-saathi-navy leading-snug">
          {scheme.name}
        </h3>

        {/* Official Description */}
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 line-clamp-2">
          {scheme.description}
        </p>

        {/* Multilingual AI Explanation Bubble */}
        <div
          className={`mt-4 rounded-2xl p-4 border relative ${
            isLikely
              ? 'bg-emerald-50/70 border-emerald-200/80'
              : 'bg-amber-50/70 border-amber-200/80'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-extrabold tracking-wider uppercase flex items-center gap-1 text-slate-600">
              <Sparkles className="w-3.5 h-3.5 text-saathi-saffron" />
              <span>Saathi AI Insights ({language.toUpperCase()})</span>
            </span>

            {/* Read Aloud Button */}
            <button
              type="button"
              onClick={handleAudioToggle}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition shadow-sm ${
                isSpeakingThis
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
              }`}
              title={isSpeakingThis ? t.stopAudio : t.readAloud}
            >
              {isSpeakingThis ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>{t.stopAudio}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-saathi-saffronDark" />
                  <span>{t.readAloud}</span>
                </>
              )}
            </button>
          </div>

          <p className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
            {currentExplanation}
          </p>
        </div>

        {/* Highlighted Reasons / Conditions */}
        <div className="mt-4 space-y-1.5">
          {matched_reasons.slice(0, 2).map((reason, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>{reason}</span>
            </div>
          ))}
          {unmet_or_pending_criteria.slice(0, 1).map((cond, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-medium text-amber-800">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span>{cond}</span>
            </div>
          ))}
        </div>

        {/* Deadline Notice */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Deadline: <strong className="text-slate-700">{scheme.deadline}</strong></span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 sm:p-5 pt-3 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
        <a
          href={scheme.official_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-saathi-navy hover:text-saathi-saffron transition"
        >
          <span>{t.verifyOfficialLink}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onVerifyDocument}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm transition shadow-sm"
            title="Scan document for this scheme"
          >
            <Camera className="w-3.5 h-3.5 text-saathi-saffron" />
            <span>Check Doc</span>
          </button>

          <button
            type="button"
            onClick={onOpenChecklist}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-saathi-navy hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95"
          >
            <ListChecks className="w-4 h-4 text-amber-400" />
            <span>{t.openChecklist}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
