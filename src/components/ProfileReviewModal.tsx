'use client';

import React, { useState } from 'react';
import { UserProfile, SupportedLanguage } from '../types';
import { translations } from '../lib/i18n';
import { Check, Edit2, AlertCircle, ArrowRight, User, MapPin, Briefcase, IndianRupee, Layers, GraduationCap } from 'lucide-react';

interface ProfileReviewModalProps {
  language: SupportedLanguage;
  profile: UserProfile;
  isOpen: boolean;
  onConfirm: (confirmedProfile: UserProfile) => void;
  onClose: () => void;
  isLoading: boolean;
}

export const ProfileReviewModal: React.FC<ProfileReviewModalProps> = ({
  language,
  profile,
  isOpen,
  onConfirm,
  onClose,
  isLoading,
}) => {
  const t = translations[language];
  const [formData, setFormData] = useState<UserProfile>({ ...profile });
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof UserProfile, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfirm = () => {
    onConfirm(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-saathi-navy to-slate-800 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Step 1 of 2: Profile Verification
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                {t.profileConfirmedTitle}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Done Editing' : t.editProfile}</span>
            </button>
          </div>
          <p className="text-xs text-slate-300 mt-2">
            {t.profileExtractedSubtitle}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Missing Info Warning */}
          {formData.missing_critical_info && formData.missing_critical_info.length > 0 && (
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-amber-800">
                <strong className="font-bold block mb-1">
                  {t.missingInfoPrompt}
                </strong>
                <span>
                  Missing: {formData.missing_critical_info.join(', ')}. You can fill them in below for the most precise match!
                </span>
              </div>
            </div>
          )}

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Age */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <User className="w-3.5 h-3.5 text-saathi-saffron" />
                <span>{t.ageLabel}</span>
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.age ?? ''}
                  onChange={(e) => handleChange('age', parseInt(e.target.value) || undefined)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-saathi-saffron"
                />
              ) : (
                <span className="text-base font-extrabold text-saathi-navy">
                  {formData.age ? `${formData.age} years` : 'Not specified'}
                </span>
              )}
            </div>

            {/* Occupation */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Briefcase className="w-3.5 h-3.5 text-saathi-saffron" />
                <span>{t.occupationLabel}</span>
              </label>
              {isEditing ? (
                <select
                  value={formData.occupation ?? 'farmer'}
                  onChange={(e) => handleChange('occupation', e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-saathi-saffron"
                >
                  <option value="farmer">Farmer / Agriculture</option>
                  <option value="student">Student</option>
                  <option value="daily_wage">Daily Wage Worker</option>
                  <option value="self_employed">Small Business / Self Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="senior_citizen">Senior Citizen / Retired</option>
                </select>
              ) : (
                <span className="text-base font-extrabold text-saathi-navy capitalize">
                  {formData.occupation || 'Farmer'}
                </span>
              )}
            </div>

            {/* Annual Income */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-saathi-saffron" />
                <span>{t.incomeLabel}</span>
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.annual_income ?? ''}
                  onChange={(e) => handleChange('annual_income', parseInt(e.target.value) || undefined)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-saathi-saffron"
                  placeholder="e.g. 100000"
                />
              ) : (
                <span className="text-base font-extrabold text-saathi-navy">
                  {formData.annual_income ? `₹${formData.annual_income.toLocaleString('en-IN')} / yr` : 'Under ₹2.5 Lakh'}
                </span>
              )}
            </div>

            {/* State */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-saathi-saffron" />
                <span>{t.stateLabel}</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.state ?? 'Telangana'}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-saathi-saffron"
                />
              ) : (
                <span className="text-base font-extrabold text-saathi-navy">
                  {formData.state || 'All India'}
                </span>
              )}
            </div>

            {/* Land Holdings */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Layers className="w-3.5 h-3.5 text-saathi-saffron" />
                <span>{t.landLabel}</span>
              </label>
              {isEditing ? (
                <input
                  type="number"
                  step="0.1"
                  value={formData.land_acres ?? ''}
                  onChange={(e) => handleChange('land_acres', parseFloat(e.target.value) || undefined)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-saathi-saffron"
                  placeholder="Acres (e.g. 2.0)"
                />
              ) : (
                <span className="text-base font-extrabold text-saathi-navy">
                  {formData.land_acres !== undefined ? `${formData.land_acres} Acres` : 'N/A (Landless / Student)'}
                </span>
              )}
            </div>

            {/* Education & Family */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-saathi-saffron" />
                <span>{t.educationLabel}</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.family_details ?? formData.education_level ?? ''}
                  onChange={(e) => handleChange('family_details', e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-saathi-saffron"
                  placeholder="e.g. Daughter in 11th grade"
                />
              ) : (
                <span className="text-sm font-bold text-saathi-navy">
                  {formData.family_details || formData.education_level || 'General citizen'}
                </span>
              )}
            </div>
          </div>

          {/* Original Transcript Prompt for Context */}
          {formData.raw_query && (
            <div className="text-xs text-slate-500 bg-slate-50 rounded-xl p-3 border border-slate-100">
              <span className="font-semibold text-slate-600">Original Voice/Input: </span>
              <em>&quot;{formData.raw_query}&quot;</em>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 font-semibold text-sm transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-saathi-green hover:bg-saathi-greenDark text-white font-extrabold text-sm sm:text-base shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Matching Schemes...</span>
              </>
            ) : (
              <>
                <span>{t.confirmAndFindSchemes}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
