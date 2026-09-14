"use client";

import { Music2, Pause, Play, Volume2, VolumeX } from "lucide-react";

type MusicPlayerProps = {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  onPlay: () => void;
  onPause: () => void;
  onMute: () => void;
  onVolume: (volume: number) => void;
};

export function MusicPlayer({ isPlaying, isMuted, volume, onPlay, onPause, onMute, onVolume }: MusicPlayerProps) {
  return (
    <aside className="music-player" aria-label="Background music controls">
      <div className="music-label">
        <span className={`music-disc ${isPlaying ? "music-disc--playing" : ""}`}><Music2 size={17} /></span>
        <span><small>Background Music</small><strong>Birthday melody</strong></span>
      </div>
      <div className="music-controls">
        <button className="icon-button" onClick={isPlaying ? onPause : onPlay} aria-label={isPlaying ? "Pause music" : "Play music"}>
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
        </button>
        <button className="icon-button" onClick={onMute} aria-label={isMuted ? "Unmute music" : "Mute music"}>
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <label className="sr-only" htmlFor="music-volume">Music volume</label>
        <input
          id="music-volume"
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(event) => onVolume(Number(event.target.value))}
          aria-label="Music volume"
        />
      </div>
    </aside>
  );
}