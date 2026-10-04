import React, { useState } from 'react';
import { KernelTelemetry, SyscallLog, SyscallName, KernelType } from '../types/os';
import {
  Cpu,
  Activity,
  Terminal,
  Play,
  RotateCcw,
  Sparkles,
  Server,
  Layers,
  Database,
  Radio,
} from 'lucide-react';

interface KernelMonitorPanelProps {
  kernels: KernelTelemetry[];
  syscallLogs: SyscallLog[];
  onTriggerSyscall: (kernel: KernelType, syscall: SyscallName) => Promise<void>;
  isExecutingSyscall: boolean;
}

export const KernelMonitorPanel: React.FC<KernelMonitorPanelProps> = ({
  kernels,
  syscallLogs,
  onTriggerSyscall,
  isExecutingSyscall,
}) => {
  const [selectedSyscall, setSelectedSyscall] = useState<SyscallName>('sys_ffmpeg_filtergraph');
  const [selectedKernel, setSelectedKernel] = useState<KernelType>('video');

  const availableSyscalls: Array<{ name: SyscallName; kernel: KernelType; label: string }> = [
    { name: 'sys_ffmpeg_filtergraph', kernel: 'video', label: 'FFmpeg Filtergraph Render' },
    { name: 'sys_remotion_render', kernel: 'video', label: 'Remotion TSX Canvas Frame' },
    { name: 'sys_whisper_transcribe', kernel: 'cognitive', label: 'Whisper Audio Transcription' },
    { name: 'sys_clip_embed', kernel: 'semantic', label: 'OpenCLIP Cross-Modal Embedding' },
    { name: 'sys_scene_detect', kernel: 'semantic', label: 'PySceneDetect Boundary Detection' },
    { name: 'sys_gstreamer_pipeline', kernel: 'video', label: 'GStreamer Hardware HW-Decode' },
    { name: 'sys_webrtc_broadcast', kernel: 'realtime', label: 'Pion WebRTC Peer Broadcast' },
    { name: 'sys_crdt_sync', kernel: 'realtime', label: 'Timeline CRDT Delta Convergence' },
    { name: 'sys_audio_ducking', kernel: 'video', label: 'Spectral Sidechain Audio Ducking' },
    { name: 'sys_cas_dedup', kernel: 'storage', label: 'BLAKE3 Deduplication Check' },
  ];

  const handleRun = () => {
    onTriggerSyscall(selectedKernel, selectedSyscall);
  };

  return (
    <div className="flex flex-col h-full bg-[#0b0e14] border border-slate-800 rounded-lg overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#10141e] border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Multi-Kernel Process Scheduler & Syscall Bus</span>
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-xs text-slate-400 font-mono">5 Active Kernels</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span>IPC: SHM ZERO-COPY</span>
          <span>·</span>
          <span className="text-emerald-400">STATUS: ALL NOMINAL</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#080a0f]">
        {/* 5 Kernels Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {kernels.map((kernel) => (
            <div
              key={kernel.id}
              className="bg-[#0e121a] rounded-lg border border-slate-800 p-3 flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-200">{kernel.name}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 block mb-2 leading-tight">
                  {kernel.runtime}
                </span>
                <p className="text-[11px] text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                  {kernel.description}
                </p>
              </div>

              {/* Resource meters */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/60 text-[10px] font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>CPU:</span>
                  <span className="text-cyan-300 font-semibold">{kernel.cpuPercent}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                  <div
                    style={{ width: `${kernel.cpuPercent}%` }}
                    className="bg-cyan-400 h-full rounded-full"
                  ></div>
                </div>

                <div className="flex justify-between text-slate-400 pt-1">
                  <span>GPU:</span>
                  <span className="text-amber-300 font-semibold">{kernel.gpuPercent}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                  <div
                    style={{ width: `${kernel.gpuPercent}%` }}
                    className="bg-amber-400 h-full rounded-full"
                  ></div>
                </div>

                <div className="flex justify-between text-slate-500 pt-1">
                  <span>RAM: {kernel.memoryMb}MB</span>
                  <span>Syscalls: {kernel.syscallCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Syscall Interactive Test Bench */}
        <div className="bg-[#0e121a] rounded-lg border border-slate-800 p-4 shadow-md">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-white">Syscall Execution Dispatcher</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Dispatches directly to kernel execution layer
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <select
              value={selectedSyscall}
              onChange={(e) => {
                const call = availableSyscalls.find((c) => c.name === e.target.value);
                if (call) {
                  setSelectedSyscall(call.name);
                  setSelectedKernel(call.kernel);
                }
              }}
              className="bg-[#090b10] border border-slate-800 text-slate-200 text-xs rounded px-3 py-2 font-mono flex-1 focus:outline-none focus:border-cyan-500"
            >
              {availableSyscalls.map((call) => (
                <option key={call.name} value={call.name}>
                  {call.name} — {call.label} ({call.kernel.toUpperCase()} KERNEL)
                </option>
              ))}
            </select>

            <button
              onClick={handleRun}
              disabled={isExecutingSyscall}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
                isExecutingSyscall
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isExecutingSyscall ? 'Running Syscall...' : 'Invoke Syscall'}</span>
            </button>
          </div>
        </div>

        {/* Live Syscall Event Stream */}
        <div className="bg-[#0e121a] rounded-lg border border-slate-800 p-4 shadow-md flex-1 flex flex-col min-h-[220px]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-white">Kernel Event Bus & Syscall Stream</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Real-time trace logs</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 font-mono text-xs">
            {syscallLogs.map((log) => (
              <div
                key={log.id}
                className="bg-[#090b10] rounded border border-slate-800/80 p-2.5 flex items-start justify-between gap-3 text-slate-300 hover:border-slate-700 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-cyan-400 bg-cyan-950 px-1 rounded border border-cyan-800/40">
                      {log.syscall}
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-1 rounded">
                      {log.kernel.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">{log.outputSummary}</p>
                  {log.args && (
                    <div className="text-[10px] text-slate-500 mt-1 truncate">
                      ARGS: {JSON.stringify(log.args)}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end shrink-0 text-[10px]">
                  <span className="text-emerald-400 font-semibold">{log.durationMs}ms</span>
                  {log.gpuAllocated && (
                    <span className="text-amber-400">{log.gpuAllocated}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
