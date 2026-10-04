import React, { useState } from 'react';
import { TimelineTrack, TimelineClip } from '../types/os';
import {
  Scissors,
  Trash2,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  ZoomIn,
  ZoomOut,
  Magnet,
  Layers,
  Plus,
} from 'lucide-react';

interface TimelineEngineProps {
  tracks: TimelineTrack[];
  setTracks: React.Dispatch<React.SetStateAction<TimelineTrack[]>>;
  currentTime: number;
  setCurrentTime: (t: number) => void;
  selectedClipId: string | null;
  setSelectedClipId: (id: string | null) => void;
  totalDurationSeconds?: number;
}

export const TimelineEngine: React.FC<TimelineEngineProps> = ({
  tracks,
  setTracks,
  currentTime,
  setCurrentTime,
  selectedClipId,
  setSelectedClipId,
  totalDurationSeconds = 30,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1.0); // 1.0 = fit, 2.0 = 2x zoom
  const [snapToGrid, setSnapToGrid] = useState<boolean>(true);

  // Width in pixels per second
  const pxPerSecond = 36 * zoomLevel;
  const timelineWidth = Math.max(800, totalDurationSeconds * pxPerSecond);

  // Ruler tick marks (every 1 second)
  const ticks = Array.from({ length: totalDurationSeconds + 1 }, (_, i) => i);

  // Split selected clip at playhead
  const handleSplitClip = () => {
    if (!selectedClipId) return;

    setTracks((prevTracks) =>
      prevTracks.map((track) => {
        const clip = track.clips.find((c) => c.id === selectedClipId);
        if (!clip) return track;

        // Check if playhead is within clip boundaries
        if (currentTime <= clip.startTime || currentTime >= clip.startTime + clip.duration) {
          return track;
        }

        const firstDuration = currentTime - clip.startTime;
        const secondDuration = clip.duration - firstDuration;

        const firstClip: TimelineClip = {
          ...clip,
          duration: firstDuration,
        };

        const secondClip: TimelineClip = {
          ...clip,
          id: `clip_${Date.now()}`,
          startTime: currentTime,
          duration: secondDuration,
          sourceIn: clip.sourceIn + firstDuration,
        };

        return {
          ...track,
          clips: track.clips
            .filter((c) => c.id !== selectedClipId)
            .concat([firstClip, secondClip]),
        };
      })
    );
  };

  // Delete selected clip
  const handleDeleteClip = () => {
    if (!selectedClipId) return;
    setTracks((prev) =>
      prev.map((t) => ({
        ...t,
        clips: t.clips.filter((c) => c.id !== selectedClipId),
      }))
    );
    setSelectedClipId(null);
  };

  // Toggle Mute on track
  const toggleMute = (trackId: string) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, isMuted: !t.isMuted } : t))
    );
  };

  // Toggle Lock on track
  const toggleLock = (trackId: string) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, isLocked: !t.isLocked } : t))
    );
  };

  // Handle timeline ruler click
  const handleRulerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    let newTime = clickX / pxPerSecond;
    if (snapToGrid) {
      // Snap to nearest 0.5s
      newTime = Math.round(newTime * 2) / 2;
    }
    setCurrentTime(Math.max(0, Math.min(totalDurationSeconds, newTime)));
  };

  return (
    <div className="flex flex-col bg-[#0b0e14] border border-slate-800 rounded-lg overflow-hidden h-full select-none">
      {/* Timeline Toolbar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#10141e] border-b border-slate-800/80 text-xs shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Universal Timeline Engine</span>
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-[11px] text-slate-400 font-mono">6 Tracks Active</span>
        </div>

        {/* Editing Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSplitClip}
            disabled={!selectedClipId}
            className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
              selectedClipId
                ? 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700'
                : 'text-slate-600 cursor-not-allowed'
            }`}
            title="Split Clip at Playhead"
          >
            <Scissors className="w-3 h-3" />
            <span>Split (S)</span>
          </button>

          <button
            onClick={handleDeleteClip}
            disabled={!selectedClipId}
            className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
              selectedClipId
                ? 'bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/40'
                : 'text-slate-600 cursor-not-allowed'
            }`}
            title="Delete Selected Clip"
          >
            <Trash2 className="w-3 h-3" />
            <span>Delete</span>
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1"></div>

          {/* Snap toggle */}
          <button
            onClick={() => setSnapToGrid(!snapToGrid)}
            className={`p-1 rounded transition-colors ${
              snapToGrid ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-500 hover:text-slate-300'
            }`}
            title="Snap to Grid"
          >
            <Magnet className="w-3.5 h-3.5" />
          </button>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-[#090b10] px-1 py-0.5 rounded border border-slate-800 text-[11px]">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
              className="p-1 text-slate-400 hover:text-white"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="font-mono text-slate-300 w-8 text-center">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(3.0, z + 0.2))}
              className="p-1 text-slate-400 hover:text-white"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Track Workspace with Header Column and Track Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Track Headers (Controls & Volume) */}
        <div className="w-52 bg-[#0d1017] border-r border-slate-800 shrink-0 flex flex-col pt-7 z-10 shadow-lg">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="h-14 border-b border-slate-800/70 px-2.5 flex items-center justify-between text-xs hover:bg-[#121622] transition-colors"
            >
              <div className="flex flex-col truncate pr-1">
                <span className="font-medium text-slate-200 truncate">{track.label}</span>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                  {track.type} · {track.clips.length} {track.clips.length === 1 ? 'clip' : 'clips'}
                </span>
              </div>

              {/* Track Toggles */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleMute(track.id)}
                  title={track.isMuted ? 'Unmute Track' : 'Mute Track'}
                  className={`p-1 rounded text-xs transition-colors ${
                    track.isMuted ? 'bg-amber-500/20 text-amber-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {track.isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                </button>
                <button
                  onClick={() => toggleLock(track.id)}
                  title={track.isLocked ? 'Unlock Track' : 'Lock Track'}
                  className={`p-1 rounded text-xs transition-colors ${
                    track.isLocked ? 'bg-rose-500/20 text-rose-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {track.isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Scrollable Area: Ruler and Track Lanes */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden relative bg-[#080a0f]" id="timeline-scroll-container">
          <div style={{ width: `${timelineWidth}px` }} className="relative h-full">
            {/* Top Ruler Bar */}
            <div
              onClick={handleRulerClick}
              className="h-7 bg-[#0f131c] border-b border-slate-800 flex items-end cursor-pointer sticky top-0 z-20 select-none"
            >
              {ticks.map((second) => (
                <div
                  key={second}
                  style={{ left: `${second * pxPerSecond}px` }}
                  className="absolute bottom-0 flex flex-col items-center"
                >
                  <span className="text-[10px] text-slate-400 font-mono -translate-y-1">
                    {second % 5 === 0 ? `${second}s` : ''}
                  </span>
                  <div
                    className={`w-px ${
                      second % 5 === 0 ? 'h-3 bg-slate-500' : 'h-1.5 bg-slate-700'
                    }`}
                  ></div>
                </div>
              ))}
            </div>

            {/* Playhead Red Needle */}
            <div
              style={{ left: `${currentTime * pxPerSecond}px` }}
              className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-30 pointer-events-none shadow-[0_0_8px_rgba(244,63,94,0.8)]"
            >
              <div className="w-3.5 h-3.5 -ml-[6px] bg-rose-500 rounded-sm rotate-45 flex items-center justify-center -translate-y-1"></div>
            </div>

            {/* Track Lanes */}
            <div className="flex flex-col">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  onClick={(e) => {
                    // Clicking empty track area sets playhead
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    let newTime = clickX / pxPerSecond;
                    if (snapToGrid) newTime = Math.round(newTime * 2) / 2;
                    setCurrentTime(Math.max(0, Math.min(totalDurationSeconds, newTime)));
                  }}
                  className={`h-14 border-b border-slate-800/60 relative hover:bg-slate-900/30 transition-colors ${
                    track.isMuted ? 'opacity-40' : ''
                  }`}
                >
                  {/* Subtle Grid vertical lines */}
                  {ticks
                    .filter((t) => t % 5 === 0)
                    .map((sec) => (
                      <div
                        key={sec}
                        style={{ left: `${sec * pxPerSecond}px` }}
                        className="absolute top-0 bottom-0 w-px bg-slate-800/40 pointer-events-none"
                      ></div>
                    ))}

                  {/* Render Track Clips */}
                  {track.clips.map((clip) => {
                    const isSelected = selectedClipId === clip.id;
                    const clipLeft = clip.startTime * pxPerSecond;
                    const clipWidth = clip.duration * pxPerSecond;

                    return (
                      <div
                        key={clip.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedClipId(clip.id);
                        }}
                        style={{
                          left: `${clipLeft}px`,
                          width: `${clipWidth}px`,
                          backgroundColor: clip.color || '#3b82f6',
                        }}
                        className={`absolute top-1.5 bottom-1.5 rounded cursor-pointer transition-all overflow-hidden flex flex-col justify-between p-1.5 text-xs shadow-md border ${
                          isSelected
                            ? 'ring-2 ring-cyan-400 ring-offset-1 ring-offset-slate-950 border-white'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center justify-between text-white font-medium text-[11px] truncate drop-shadow-sm">
                          <span className="truncate">{clip.title}</span>
                          <span className="font-mono text-[9px] opacity-80 pl-1 shrink-0">
                            {clip.duration.toFixed(1)}s
                          </span>
                        </div>

                        {/* Effects or Caption Snippet tag */}
                        <div className="flex items-center gap-1 text-[9px] text-white/90 truncate font-mono">
                          {clip.captionText ? (
                            <span className="truncate italic">"{clip.captionText}"</span>
                          ) : clip.effects && clip.effects.length > 0 ? (
                            <span className="truncate">{clip.effects[0]}</span>
                          ) : (
                            <span>Vol: {clip.volume.toFixed(1)}x</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
