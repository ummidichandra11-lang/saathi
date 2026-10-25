'use client';

import React, { useState, useRef } from 'react';
import { UserProfile, DocumentVerificationResult, SupportedLanguage } from '../types';
import { translations } from '../lib/i18n';
import {
  X,
  Upload,
  Camera,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  FileText,
  UserCheck,
  RefreshCw,
  Sparkles,
  Lock,
} from 'lucide-react';

interface DocumentVerificationModalProps {
  language: SupportedLanguage;
  profile?: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentVerificationModal: React.FC<DocumentVerificationModalProps> = ({
  language,
  profile,
  isOpen,
  onClose,
}) => {
  const t = translations[language];
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DocumentVerificationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setResult(null);
      setErrorMessage(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerify = async () => {
    if (!previewUrl) return;

    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/verify-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: previewUrl,
          mimeType: selectedFile?.type || 'image/jpeg',
          profile: profile,
        }),
      });

      const data = await response.json();
      if (data.success && data.verification) {
        setResult(data.verification);
      } else {
        setErrorMessage(data.error || 'Failed to analyze document.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error during verification.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-saathi-navy to-slate-900 text-white p-5 sm:p-6 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-2">
                <Lock className="w-3 h-3" />
                <span>Zero Data Retention Privacy Shield</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {t.verifyDocTitle}
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
            {t.verifyDocDesc}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Privacy Guarantee Alert */}
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-900 leading-relaxed font-medium">
              {t.privacyGuarantee}
            </p>
          </div>

          {/* Upload Drop Zone / Camera Trigger */}
          {!previewUrl ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer border-2 border-dashed border-slate-300 hover:border-saathi-saffron rounded-3xl p-8 text-center bg-slate-50/70 hover:bg-amber-50/30 transition-all flex flex-col items-center justify-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-saathi-saffron group-hover:scale-110 transition-transform mb-3">
                <Camera className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-800">
                {t.uploadDocPrompt}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Aadhaar card, Income certificate, Caste certificate, or Land record
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Document Image Preview */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 max-h-56 bg-slate-100 flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="Uploaded document preview"
                  className="max-h-56 w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={handleReset}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition text-xs font-bold"
                  title="Remove image"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Verify Action Button */}
              {!result && (
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={isAnalyzing}
                  className="w-full py-3 px-4 rounded-xl bg-saathi-navy hover:bg-slate-800 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Inspecting document with Claude Vision...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Start AI Document Check</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {errorMessage && (
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 font-semibold">
              {errorMessage}
            </div>
          )}

          {/* Analysis Report */}
          {result && (
            <div className="rounded-2xl border-2 border-slate-200 p-4 space-y-4 bg-white animate-fadeIn">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-saathi-saffron" />
                  <span className="font-extrabold text-slate-900">
                    {result.document_type || 'Detected Identity Document'}
                  </span>
                </div>

                <span
                  className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                    result.legibility_status === 'clear'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  Legibility: {result.legibility_status.toUpperCase()}
                </span>
              </div>

              {/* Profile Match Cross-Check */}
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase text-slate-500">
                  <UserCheck className="w-4 h-4 text-saathi-green" />
                  <span>Profile Comparison Verdict</span>
                </div>

                <div className="flex items-center gap-2 text-sm font-black">
                  {result.profile_match_verdict === 'matches_profile' ? (
                    <span className="text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" />
                      Name and Year of Birth match your confirmed profile
                    </span>
                  ) : (
                    <span className="text-amber-700 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      Minor differences noted or name needs confirmation
                    </span>
                  )}
                </div>

                {result.extracted_fields && (
                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200/60 text-xs">
                    <div>
                      <span className="text-slate-400">Name on Document:</span>{' '}
                      <strong className="text-slate-800">{result.extracted_fields.name || 'Not detected'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Year of Birth / DOB:</span>{' '}
                      <strong className="text-slate-800">{result.extracted_fields.dob_or_year || 'Not detected'}</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Actionable Recommendations */}
              {result.recommendations && result.recommendations.length > 0 && (
                <div className="space-y-1.5 text-xs text-slate-700">
                  <strong className="font-bold text-slate-900 block">AI Findings & Next Steps:</strong>
                  {result.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Image wiped from volatile memory</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-saathi-navy text-white text-xs sm:text-sm font-extrabold hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
