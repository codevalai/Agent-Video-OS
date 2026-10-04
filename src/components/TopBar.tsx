import React from 'react';
import { OSShellTarget } from '../types/os';
import {
  Play,
  Pause,
  RotateCcw,
  Monitor,
  Globe,
  Smartphone,
  Cpu,
  Layers,
  Sparkles,
  Download,
  Zap,
} from 'lucide-react';

interface TopBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  shellTarget: OSShellTarget;
  setShellTarget: (target: OSShellTarget) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTime: number;
  onResetTime: () => void;
  onRunPipeline: () => void;
  onExportRender: () => void;
  onOpenGoldenPath: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  setActiveTab,
  shellTarget,
  setShellTarget,
  isPlaying,
  onTogglePlay,
  currentTime,
  onResetTime,
  onRunPipeline,
  onExportRender,
  onOpenGoldenPath,
}) => {
  // Format seconds into SMPTE timecode (HH:MM:SS:FF @ 30fps)
  const formatTimecode = (sec: number) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = Math.floor(sec % 60);
    const frames = Math.floor((sec % 1) * 30);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${frames
      .toString()
      .padStart(2, '0')}`;
  };

  const navLinks = [
    { id: 'workstation', label: 'Workstation' },
    { id: 'tml', label: 'TML Compiler' },
    { id: 'memory', label: 'Memory Fabric' },
    { id: 'arbiter', label: 'Kernel Arbiter' },
    { id: 'agents', label: 'Agents' },
    { id: 'pipelines', label: 'Pipelines' },
    { id: 'semantic', label: 'Semantic DB' },
    { id: 'governance', label: 'Creator Graph' },
  ];

  return (
    <header className="flex items-center justify-between px-5 py-2.5 bg-[#0b0e14] border-b border-slate-800/80 shrink-0 select-none">
      {/* Zone 1: Single text element Brand Title */}
      <div className="flex items-center gap-4">
        <a
          href="/"
          className="text-base font-bold tracking-tight text-white flex items-center gap-2 hover:text-cyan-400 transition-colors whitespace-nowrap"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 inline-block shadow-[0_0_8px_rgba(34,211,238,0.6)]"></span>
          <span className="font-display tracking-wider">AGENTIC VIDEO OS</span>
        </a>

        {/* Global Playhead Scrub HUD */}
        <div className="hidden lg:flex items-center gap-2 bg-[#121722] px-2.5 py-1 rounded border border-slate-800 text-xs">
          <button
            onClick={onResetTime}
            title="Rewind to start"
            className="p-1 text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onTogglePlay}
            className={`px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
            }`}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <span className="font-mono text-cyan-300 font-semibold text-xs tracking-wider tabular-nums px-1">
            {formatTimecode(currentTime)}
          </span>
          <span className="text-[11px] text-slate-500 font-mono">60 FPS</span>
        </div>
      </div>

      {/* Zone 2: Clean text navigation links */}
      <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-400">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveTab(link.id)}
            className={`transition-colors text-xs tracking-wide uppercase font-semibold pb-0.5 ${
              activeTab === link.id
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* Zone 3: Primary Actions & Golden Path Runner */}
      <div className="flex items-center gap-2.5">
        {/* Golden Path Canonical Runbook Trigger */}
        <button
          onClick={onOpenGoldenPath}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded shadow-md transition-all whitespace-nowrap"
          title="Run complete 60s Quantum Dilemma Golden Path stack"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span className="hidden sm:inline">Golden Path (60s)</span>
        </button>

        {/* OS Shell Target Selector */}
        <div className="flex items-center bg-[#121722] p-0.5 rounded border border-slate-800 text-xs">
          <button
            onClick={() => setShellTarget('desktop')}
            title="Desktop Shell (Tauri / Local GPU)"
            className={`p-1.5 rounded transition-colors ${
              shellTarget === 'desktop'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setShellTarget('web')}
            title="Web OS (Cloud Render / WASM)"
            className={`p-1.5 rounded transition-colors ${
              shellTarget === 'web'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setShellTarget('mobile')}
            title="Mobile Studio (9:16 Shorts / Remote)"
            className={`p-1.5 rounded transition-colors ${
              shellTarget === 'mobile'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setShellTarget('edge')}
            title="Edge Node (Jetson / Local Ingest)"
            className={`p-1.5 rounded transition-colors ${
              shellTarget === 'edge'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={onExportRender}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded shadow-sm transition-colors whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5 text-slate-950" />
          <span>Render Master</span>
        </button>
      </div>
    </header>
  );
};
