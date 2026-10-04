import React from 'react';
import { TimelineClip, TimelineTrack } from '../types/os';
import { X, Sliders, Volume2, FastForward, Sparkles, Layers } from 'lucide-react';

interface ClipInspectorDrawerProps {
  selectedClipId: string | null;
  onClose: () => void;
  tracks: TimelineTrack[];
  setTracks: React.Dispatch<React.SetStateAction<TimelineTrack[]>>;
}

export const ClipInspectorDrawer: React.FC<ClipInspectorDrawerProps> = ({
  selectedClipId,
  onClose,
  tracks,
  setTracks,
}) => {
  if (!selectedClipId) return null;

  // Find clip and track
  let foundClip: TimelineClip | null = null;
  let foundTrack: TimelineTrack | null = null;

  for (const track of tracks) {
    const c = track.clips.find((item) => item.id === selectedClipId);
    if (c) {
      foundClip = c;
      foundTrack = track;
      break;
    }
  }

  if (!foundClip || !foundTrack) return null;

  const updateClip = (partial: Partial<TimelineClip>) => {
    setTracks((prev) =>
      prev.map((t) => {
        if (t.id !== foundTrack?.id) return t;
        return {
          ...t,
          clips: t.clips.map((c) => (c.id === selectedClipId ? { ...c, ...partial } : c)),
        };
      })
    );
  };

  return (
    <div className="w-80 bg-[#0e121a] border-l border-slate-800 p-4 flex flex-col gap-4 text-xs select-none overflow-y-auto shrink-0 shadow-2xl z-20">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-slate-200">Clip Inspector</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div>
        <label className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
          Clip Title
        </label>
        <input
          type="text"
          value={foundClip.title}
          onChange={(e) => updateClip({ title: e.target.value })}
          className="w-full bg-[#080a0f] border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 font-semibold focus:outline-none focus:border-cyan-500 text-xs"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div>
          <label className="text-[10px] text-slate-500 block mb-1">Start Time (s)</label>
          <input
            type="number"
            step="0.1"
            value={foundClip.startTime}
            onChange={(e) => updateClip({ startTime: parseFloat(e.target.value) || 0 })}
            className="w-full bg-[#080a0f] border border-slate-800 rounded px-2 py-1 text-slate-200"
          />
        </div>
        <div>
          <label className="text-[10px] text-slate-500 block mb-1">Duration (s)</label>
          <input
            type="number"
            step="0.1"
            value={foundClip.duration}
            onChange={(e) => updateClip({ duration: parseFloat(e.target.value) || 1 })}
            className="w-full bg-[#080a0f] border border-slate-800 rounded px-2 py-1 text-slate-200"
          />
        </div>
      </div>

      {/* Volume Gain Slider */}
      <div>
        <div className="flex justify-between text-slate-400 mb-1">
          <span>Audio Gain / Volume</span>
          <span className="font-mono text-cyan-300">{(foundClip.volume * 100).toFixed(0)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="2.0"
          step="0.05"
          value={foundClip.volume}
          onChange={(e) => updateClip({ volume: parseFloat(e.target.value) })}
          className="w-full accent-cyan-400"
        />
      </div>

      {/* Speed Multiplier */}
      <div>
        <div className="flex justify-between text-slate-400 mb-1">
          <span>Playback Speed</span>
          <span className="font-mono text-amber-300">{foundClip.speed.toFixed(2)}x</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="2.5"
          step="0.25"
          value={foundClip.speed}
          onChange={(e) => updateClip({ speed: parseFloat(e.target.value) })}
          className="w-full accent-amber-400"
        />
      </div>

      {/* Subtitle / Caption Text if applicable */}
      <div>
        <label className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
          Subtitle Caption
        </label>
        <textarea
          rows={3}
          value={foundClip.captionText || ''}
          onChange={(e) => updateClip({ captionText: e.target.value })}
          placeholder="Enter burned-in caption or subtitle text..."
          className="w-full bg-[#080a0f] border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-cyan-500 text-xs leading-relaxed"
        />
      </div>

      {/* Effects list */}
      <div>
        <label className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
          Applied Shaders & Filters
        </label>
        <div className="flex flex-wrap gap-1.5">
          {foundClip.effects && foundClip.effects.length > 0 ? (
            foundClip.effects.map((eff, i) => (
              <span
                key={i}
                className="bg-[#121622] text-cyan-300 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-800"
              >
                {eff}
              </span>
            ))
          ) : (
            <span className="text-slate-500 italic text-[11px]">No active filter passes</span>
          )}
        </div>
      </div>
    </div>
  );
};
