'use client';

import React, { useState, useEffect } from 'react';
import { SupportedLanguage } from '../types';
import { translations } from '../lib/i18n';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { Mic, MicOff, ArrowRight, Sparkles, Volume2, HelpCircle } from 'lucide-react';

interface VoiceIntakeProps {
  language: SupportedLanguage;
  onSubmit: (input: string) => void;
  isLoading: boolean;
}

export const VoiceIntake: React.FC<VoiceIntakeProps> = ({
  language,
  onSubmit,
  isLoading,
}) => {
  const t = translations[language];
  const [inputText, setInputText] = useState('');
  const {
    isListening,
    transcript,
    error: speechError,
    startListening,
    stopListening,
    hasSupport,
  } = useSpeechRecognition(language);

  // Sync speech recognition live transcript into text input
  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    if (isListening) stopListening();
    onSubmit(inputText.trim());
  };

  const handleDemoPersona = (personaType: 'farmer' | 'student' | 'senior') => {
    let demoString = '';
    if (personaType === 'farmer') {
      if (language === 'hi') {
        demoString = 'मैं 45 वर्ष का किसान हूँ, मेरे पास 2 एकड़ कृषि भूमि है और मेरी बेटी 11वीं कक्षा में पढ़ रही है।';
      } else if (language === 'te') {
        demoString = 'నా వయస్సు 45 సంవత్సరాలు, నేను రైతును, నాకు 2 ఎకరాల పొలం ఉంది మరియు నా కూతురు 11వ తరగతి చదువుతోంది.';
      } else {
        demoString = 'I am a 45-year-old farmer with 2 acres in Telangana, my daughter is studying in 11th grade.';
      }
    } else if (personaType === 'student') {
      if (language === 'hi') {
        demoString = 'मैं 20 वर्षीय कॉलेज छात्र हूँ, अनुसूचित जाति (SC) से हूँ, पारिवारिक वार्षिक आय 1.5 लाख है।';
      } else if (language === 'te') {
        demoString = 'నేను 20 ఏళ్ల కాలేజ్ విద్యార్థిని, మా కుటుంబ వార్షిక ఆదాయం రూ. 1.5 లక్షలు, ఎస్సీ కేటగిరీ.';
      } else {
        demoString = 'I am a 20-year-old college undergraduate student from SC category, family annual income is 1.5 lakhs.';
      }
    } else if (personaType === 'senior') {
      if (language === 'hi') {
        demoString = 'मेरी उम्र 65 वर्ष है, मैं बीपीएल परिवार से वरिष्ठ नागरिक हूँ और मुझे स्वास्थ्य और पेंशन सहायता चाहिए।';
      } else if (language === 'te') {
        demoString = 'నా వయస్సు 65 సంవత్సరాలు, బీపీఎల్ కుటుంబానికి చెందిన వృద్ధుడిని, నాకు పెన్షన్ మరియు ఆరోగ్య పథకాలు కావాలి.';
      } else {
        demoString = 'I am a 65-year-old senior citizen from a BPL household looking for old age pension and health assistance.';
      }
    }

    setInputText(demoString);
    onSubmit(demoString);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Background Accent Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-amber-200/40 via-orange-100/30 to-emerald-100/40 blur-3xl -z-10 rounded-full pointer-events-none" />

      {/* Hero Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saathi-saffronLight text-saathi-saffronDark text-xs sm:text-sm font-semibold mb-4 border border-saathi-saffron/20 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multilingual Voice AI for 100+ Indian Citizen Schemes</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-saathi-navy tracking-tight leading-tight mb-3">
          {t.heroHeadline}
        </h1>
        <p className="text-base sm:text-lg text-saathi-subtext max-w-2xl mx-auto leading-relaxed">
          {t.heroSubheadline}
        </p>
      </div>

      {/* Prominent Voice Recording Centerpiece */}
      <div className="flex flex-col items-center justify-center my-6">
        <div className="relative flex items-center justify-center">
          {/* Animated radar rings when listening */}
          {isListening && (
            <>
              <div className="absolute w-32 h-32 rounded-full bg-saathi-saffron/20 animate-ping" />
              <div className="absolute w-28 h-28 rounded-full bg-saathi-saffron/30 animate-pulse" />
            </>
          )}

          <button
            type="button"
            onClick={handleMicToggle}
            disabled={isLoading}
            className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center shadow-xl transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 ${
              isListening
                ? 'bg-gradient-to-tr from-red-500 to-rose-600 text-white shadow-rose-500/40 ring-rose-300 scale-105'
                : 'bg-gradient-to-tr from-saathi-saffron to-amber-500 text-white shadow-amber-500/30 hover:scale-105 ring-saathi-saffron/30'
            }`}
            aria-label={isListening ? t.micStopListening : t.micClickToSpeak}
          >
            {isListening ? (
              <>
                <MicOff className="w-9 h-9 sm:w-10 sm:h-10 animate-pulse" />
                <span className="text-[11px] font-bold mt-1 uppercase tracking-wider">
                  Listening
                </span>
              </>
            ) : (
              <>
                <Mic className="w-9 h-9 sm:w-10 sm:h-10" />
                <span className="text-[11px] font-bold mt-1 uppercase tracking-wider">
                  Speak
                </span>
              </>
            )}
          </button>
        </div>

        <p className="mt-3 text-sm font-semibold text-saathi-navy flex items-center gap-1.5">
          {isListening ? (
            <span className="text-red-600 animate-pulse">● {t.micListening}</span>
          ) : (
            <span>{t.micClickToSpeak}</span>
          )}
        </p>

        {speechError && (
          <p className="mt-2 text-xs text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            {speechError}
          </p>
        )}
      </div>

      {/* Freeform Text & Transcript Box */}
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="relative rounded-2xl bg-white border-2 border-slate-200 shadow-md focus-within:border-saathi-saffron focus-within:ring-4 focus-within:ring-saathi-saffron/15 transition-all">
          <textarea
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.inputPlaceholder}
            className="w-full px-4 pt-3.5 pb-14 text-base sm:text-lg text-slate-800 placeholder-slate-400 bg-transparent rounded-2xl focus:outline-none resize-none leading-relaxed"
            disabled={isLoading}
          />

          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-2">
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-saathi-navy hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t.loadingAI}</span>
                </>
              ) : (
                <>
                  <span>{t.discoverButton}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Demo Personas: Essential for instant hackathon demonstration */}
      <div className="mt-6 pt-4 border-t border-slate-200/80">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold text-saathi-subtext uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-saathi-saffron" />
            {t.demoPersonasTitle}
          </span>
          <span className="text-xs text-slate-400">One-click live scenarios</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => handleDemoPersona('farmer')}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 text-xs sm:text-sm font-semibold transition active:scale-98 shadow-sm"
          >
            <span>{t.tryDemoFarmer}</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoPersona('student')}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200/80 text-xs sm:text-sm font-semibold transition active:scale-98 shadow-sm"
          >
            <span>{t.tryDemoStudent}</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoPersona('senior')}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 text-xs sm:text-sm font-semibold transition active:scale-98 shadow-sm"
          >
            <span>{t.tryDemoSenior}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
