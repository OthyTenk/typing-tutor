import { useCallback, useRef } from "react";

export const useSound = (volume: number = 0.5, enabled: boolean = true) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getOrCreateContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      audioContextRef.current = AudioContextClass
        ? new AudioContextClass()
        : null;
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback(
    (frequency: number, duration: number = 0.1) => {
      if (!enabled) return;

      try {
        const ctx = getOrCreateContext();
        if (!ctx) return; // Guard against null context

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          ctx.currentTime + duration,
        );

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration);
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    },
    [enabled, volume, getOrCreateContext],
  );

  const sounds = {
    correct: useCallback(() => playTone(800, 0.05), [playTone]),
    error: useCallback(() => playTone(200, 0.15), [playTone]),
    complete: useCallback(() => {
      if (!enabled) return;
      // Play a chord for completion
      setTimeout(() => playTone(523.25, 0.15), 0); // C
      setTimeout(() => playTone(659.25, 0.15), 50); // E
      setTimeout(() => playTone(783.99, 0.3), 100); // G
    }, [playTone, enabled]),
    achievement: useCallback(() => {
      if (!enabled) return;
      // Play ascending notes for achievement
      setTimeout(() => playTone(523.25, 0.1), 0);
      setTimeout(() => playTone(659.25, 0.1), 80);
      setTimeout(() => playTone(783.99, 0.1), 160);
      setTimeout(() => playTone(1046.5, 0.2), 240);
    }, [playTone, enabled]),
  };

  return sounds;
};
