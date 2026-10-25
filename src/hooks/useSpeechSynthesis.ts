'use client';

import { useState, useEffect, useCallback } from 'react';
import { SupportedLanguage } from '../types';

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentText, setCurrentText] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const handleEnd = () => {
        setIsSpeaking(false);
        setCurrentText(null);
      };

      window.speechSynthesis.onvoiceschanged = () => {
        // Force loading voices
        window.speechSynthesis.getVoices();
      };

      return () => {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, []);

  const speak = useCallback((text: string, language: SupportedLanguage = 'en') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    // Cancel ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose voice & locale
    const localeMap = {
      en: 'en-IN',
      hi: 'hi-IN',
      te: 'te-IN',
    };
    utterance.lang = localeMap[language] || 'en-IN';
    utterance.rate = 0.95; // slightly slower for maximum clarity
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const targetLang = localeMap[language];
    const matchedVoice = voices.find((v) => v.lang.startsWith(targetLang) || v.lang.startsWith(language));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentText(text);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentText(null);
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      setIsSpeaking(false);
      setCurrentText(null);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentText(null);
    }
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    currentText,
  };
}
