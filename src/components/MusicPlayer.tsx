"use client";

import { Music2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [expanded, setExpanded] = useState(false);
  const [activityToken, setActivityToken] = useState(0);

  useEffect(() => {
    if (!expanded) return;
    const hideTimer = window.setTimeout(() => setExpanded(false), 5000);
    return () => window.clearTimeout(hideTimer);
  }, [expanded, activityToken]);

  return (
    <aside className="music-player" aria-label="Background music controls">
      {expanded && (
        <div
          className="music-controls"
          id="music-controls"
          onPointerDownCapture={() => setActivityToken((current) => current + 1)}
          onKeyDownCapture={() => setActivityToken((current) => current + 1)}
        >
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
      )}
      <button
        type="button"
        className="music-toggle"
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
        aria-controls="music-controls"
        aria-label={expanded ? "Minimize music controls" : "Open music controls"}
        title={expanded ? "Minimize music controls" : "Open music controls"}
      >
        <span className={`music-disc ${isPlaying ? "music-disc--playing" : ""}`}><Music2 size={19} /></span>
      </button>
    </aside>
  );
}