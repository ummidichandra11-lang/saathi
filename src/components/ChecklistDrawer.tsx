'use client';

import React, { useState } from 'react';
import { Scheme, SupportedLanguage } from '../types';
import { translations } from '../lib/i18n';
import {
  X,
  CheckCircle2,
  Circle,
  Building2,
  FileCheck2,
  ListOrdered,
  ExternalLink,
  Sparkles,
  Printer,
} from 'lucide-react';

interface ChecklistDrawerProps {
  scheme: Scheme | null;
  language: SupportedLanguage;
  isOpen: boolean;
  onClose: () => void;
}

export const ChecklistDrawer: React.FC<ChecklistDrawerProps> = ({
  scheme,
  language,
  isOpen,
  onClose,
}) => {
  const t = translations[language];

  // Store completed items (keyed by document name or step index)
  const [completedDocs, setCompletedDocs] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  if (!isOpen || !scheme) return null;

  const totalItems = scheme.required_documents.length + scheme.application_steps.length;
  const docsDoneCount = Object.values(completedDocs).filter(Boolean).length;
  const stepsDoneCount = Object.values(completedSteps).filter(Boolean).length;
  const completedTotal = docsDoneCount + stepsDoneCount;
  const progressPercentage = Math.round((completedTotal / (totalItems || 1)) * 100);

  const toggleDoc = (doc: string) => {
    setCompletedDocs((prev) => ({
      ...prev,
      [doc]: !prev[doc],
    }));
  };

  const toggleStep = (stepIdx: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepIdx]: !prev[stepIdx],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-saathi-navy text-white p-5 sm:p-6 pb-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-saathi-saffron">
                Action Roadmap & Document Kit
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {scheme.name}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-white/10 rounded-2xl p-3 border border-white/10">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span>{t.progressLabel}</span>
              <span className="text-amber-400">
                {completedTotal} of {totalItems} completed ({progressPercentage}%)
              </span>
            </div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Section 1: Required Documents & Issuing Authorities */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <h3 className="text-base sm:text-lg font-black text-saathi-navy flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-saathi-saffron" />
                <span>{t.requiredDocumentsTitle}</span>
              </h3>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                {docsDoneCount} / {scheme.required_documents.length} Collected
              </span>
            </div>

            <div className="space-y-3">
              {scheme.required_documents.map((doc, idx) => {
                const isChecked = !!completedDocs[doc];
                const whereToGet = scheme.where_to_get_documents?.[doc];

                return (
                  <div
                    key={idx}
                    onClick={() => toggleDoc(doc)}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 flex items-start gap-3.5 select-none ${
                      isChecked
                        ? 'bg-emerald-50/80 border-emerald-300 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 shrink-0 text-slate-400 focus:outline-none"
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 animate-scale" />
                      ) : (
                        <Circle className="w-6 h-6 hover:text-slate-600" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-sm sm:text-base font-bold ${
                            isChecked ? 'line-through text-slate-500' : 'text-slate-900'
                          }`}
                        >
                          {doc}
                        </span>
                        {isChecked && (
                          <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            {t.completedBadge}
                          </span>
                        )}
                      </div>

                      {whereToGet && (
                        <div className="mt-1.5 flex items-start gap-1.5 text-xs text-slate-600 bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                          <Building2 className="w-3.5 h-3.5 text-saathi-saffron shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-slate-700">{t.whereToGetDoc}</strong>{' '}
                            {whereToGet}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Numbered Step-by-Step Application Roadmap */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <h3 className="text-base sm:text-lg font-black text-saathi-navy flex items-center gap-2">
                <ListOrdered className="w-5 h-5 text-saathi-saffron" />
                <span>{t.applicationStepsTitle}</span>
              </h3>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                {stepsDoneCount} / {scheme.application_steps.length} Completed
              </span>
            </div>

            <div className="space-y-3">
              {scheme.application_steps.map((stepText, idx) => {
                const isStepChecked = !!completedSteps[idx];

                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all flex items-start gap-3.5 select-none ${
                      isStepChecked
                        ? 'bg-emerald-50/80 border-emerald-300'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 shrink-0 text-slate-400 focus:outline-none"
                    >
                      {isStepChecked ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                      ) : (
                        <Circle className="w-6 h-6 hover:text-slate-600" />
                      )}
                    </button>

                    <p
                      className={`text-sm sm:text-base font-semibold leading-relaxed ${
                        isStepChecked ? 'line-through text-slate-500' : 'text-slate-800'
                      }`}
                    >
                      {stepText}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <a
            href={scheme.official_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-saathi-navy hover:text-saathi-saffron transition"
          >
            <span>{t.verifyOfficialLink}</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-saathi-navy hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
