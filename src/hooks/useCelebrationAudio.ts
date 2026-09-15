"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

const melody = [
  [261.63, 260], [261.63, 140], [293.66, 400], [261.63, 400], [349.23, 400], [329.63, 760],
  [261.63, 260], [261.63, 140], [293.66, 400], [261.63, 400], [392.0, 400], [349.23, 760],
  [261.63, 260], [261.63, 140], [523.25, 400], [440.0, 400], [349.23, 400], [329.63, 400], [293.66, 760],
  [466.16, 260], [466.16, 140], [440.0, 400], [349.23, 400], [392.0, 400], [349.23, 900],
] as const;

export function useCelebrationAudio(autoPlay = false) {
  const contextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const noteIndexRef = useRef(0);
  const playingRef = useRef(false);
  const volumeRef = useRef(0.35);
  const mutedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.35);

  function ensureAudio() {
    if (!contextRef.current) {
      const AudioContextClass = window.AudioContext;
      contextRef.current = new AudioContextClass();
      gainRef.current = contextRef.current.createGain();
      gainRef.current.gain.value = mutedRef.current ? 0 : volumeRef.current;
      gainRef.current.connect(contextRef.current.destination);
    }
    return contextRef.current;
  }

  function playNextNote() {
    if (!playingRef.current) return;
    const context = ensureAudio();
    const [frequency, duration] = melody[noteIndexRef.current];
    const oscillator = context.createOscillator();
    const noteGain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    noteGain.gain.setValueAtTime(0, context.currentTime);
    noteGain.gain.linearRampToValueAtTime(0.7, context.currentTime + 0.03);
    noteGain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration / 1000);
    oscillator.connect(noteGain);
    noteGain.connect(gainRef.current!);
    oscillator.start();
    oscillator.stop(context.currentTime + duration / 1000);
    oscillatorRef.current = oscillator;
    noteIndexRef.current = (noteIndexRef.current + 1) % melody.length;
    timeoutRef.current = setTimeout(playNextNote, duration + 45);
  }

  async function play() {
    const context = ensureAudio();
    try {
      await context.resume();
    } catch {
      return false;
    }
    if (context.state !== "running") return false;
    if (playingRef.current) return true;
    playingRef.current = true;
    setIsPlaying(true);
    playNextNote();
    return true;
  }

  function pause() {
    playingRef.current = false;
    setIsPlaying(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    oscillatorRef.current?.stop();
    oscillatorRef.current = null;
  }

  function setVolume(nextVolume: number) {
    volumeRef.current = nextVolume;
    setVolumeState(nextVolume);
    if (gainRef.current && !mutedRef.current) gainRef.current.gain.value = nextVolume;
  }

  function toggleMute() {
    setIsMuted((current) => {
      const nextMuted = !current;
      mutedRef.current = nextMuted;
      if (gainRef.current) gainRef.current.gain.value = nextMuted ? 0 : volumeRef.current;
      return nextMuted;
    });
  }

  function playPartySound() {
    const context = ensureAudio();
    void context.resume();
    [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const start = context.currentTime + index * 0.09;
      oscillator.type = "triangle";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.28, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
      oscillator.connect(gain);
      gain.connect(gainRef.current!);
      oscillator.start(start);
      oscillator.stop(start + 0.38);
    });
  }

  const requestAutoPlay = useEffectEvent(() => play());

  useEffect(() => {
    if (!autoPlay) return;

    let active = true;
    const removeUnlockListeners = () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
    const tryAutoPlay = async () => {
      const started = await requestAutoPlay();
      if (active && started) removeUnlockListeners();
    };
    const unlockAudio = () => void tryAutoPlay();

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });
    void tryAutoPlay();

    return () => {
      active = false;
      removeUnlockListeners();
    };
  }, [autoPlay]);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    void contextRef.current?.close();
  }, []);

  return { isPlaying, isMuted, volume, play, pause, setVolume, toggleMute, playPartySound };
}