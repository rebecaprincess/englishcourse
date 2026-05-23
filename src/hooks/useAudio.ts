import { useCallback, useRef } from 'react';

const ELEVENLABS_API_KEY = 'a1VLZRC_Sr04Q0dxGUroxgvgV3T3qIvPKQ2LcOQB';
const REBECA_VOICE_ID = 'HAnxnHtj4Z84kexw7Hvb'; // Custom voice de Rebeca

export function useAudio() {
  const speakingRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  const speak = useCallback(async (text: string, lang = 'en-US') => {
    // Cancelar cualquier request anterior
    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    speakingRef.current = true;

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${REBECA_VOICE_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': ELEVENLABS_API_KEY,
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
          signal: abortRef.current.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`ElevenLabs error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        speakingRef.current = false;
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = () => {
        speakingRef.current = false;
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Error TTS:', err);
        // Fallback a SpeechSynthesis del navegador
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = lang;
          utterance.rate = 0.9;
          utterance.onstart = () => { speakingRef.current = true; };
          utterance.onend = () => { speakingRef.current = false; };
          window.speechSynthesis.speak(utterance);
        }
      }
    }
  }, []);

  const stop = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    speakingRef.current = false;
  }, []);

  const isSpeaking = useCallback(() => speakingRef.current, []);

  return { speak, stop, isSpeaking };
}
