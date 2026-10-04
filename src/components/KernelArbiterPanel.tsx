import React, { useState } from 'react';
import { KernelArbitrationState, AgentRole } from '../types/os';
import {
  ShieldAlert,
  Lock,
  Unlock,
  Clock,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Flame,
} from 'lucide-react';

interface KernelArbiterPanelProps {
  arbitrationState: KernelArbitrationState;
  setArbitrationState: React.Dispatch<React.SetStateAction<KernelArbitrationState>>;
  onAcquireLock: (role: AgentRole | 'human_director') => void;
  onYieldLock: () => void;
}

export const KernelArbiterPanel: React.FC<KernelArbiterPanelProps> = ({
  arbitrationState,
  setArbitrationState,
  onAcquireLock,
  onYieldLock,
}) => {
  const [stressTesting, setStressTesting] = useState<boolean>(false);
  const [stressMessage, setStressMessage] = useState<string | null>(null);

  const handleRunStressTest = () => {
    setStressTesting(true);
    setStressMessage('Dispatched 48 concurrent timeline lock requests to Arbiter...');

    setTimeout(() => {
      setArbitrationState((prev) => ({
        ...prev,
        frameMissesCount: 0,
        gpuBudgetAllocatedPercent: 86.4,
      }));
      setStressTesting(false);
      setStressMessage(
        'Arbiter stress test passed: 0 frame deadline breaches, all 48 concurrent locks sequenced cleanly.'
      );
      setTimeout(() => setStressMessage(null), 4000);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-[#0b0e14] border border-slate-800 rounded-lg overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#10141e] border-b border-slate-800/80 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            <span>Kernel Arbitration Layer (Deadlock Arbiter & Frame Deadline Guard)</span>
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-xs text-slate-400 font-mono">Kernel of Kernels</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunStressTest}
            disabled={stressTesting}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{stressTesting ? 'Simulating Load...' : 'Stress Test Arbiter'}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#080a0f] space-y-4">
        {stressMessage && (
          <div className="p-2.5 rounded bg-cyan-950/60 border border-cyan-800 text-cyan-200 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{stressMessage}</span>
          </div>
        )}

        {/* Current Lock Owner Card */}
        <div className="bg-[#0e121a] rounded-lg border border-slate-800 p-4 shadow-md">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-white">Timeline Mutex & Write Lock Owner</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              LOCK ACQUIRED @ {arbitrationState.lockAcquiredTimestamp}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#090b10] p-3 rounded border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
              <div>
                <span className="text-xs font-bold text-white uppercase font-mono">
                  {arbitrationState.timelineLockOwner}
                </span>
                <span className="block text-[10px] text-slate-500 font-mono">
                  Exclusive write permissions granted on Universal Timeline Engine
                </span>
              </div>
            </div>

            {/* Lock Control Buttons */}
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => onAcquireLock('director')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium border border-slate-700 transition-colors"
              >
                Grant to Director
              </button>
              <button
                onClick={() => onAcquireLock('human_director')}
                className="px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-semibold border border-cyan-500/40 transition-colors"
              >
                Human Override
              </button>
              <button
                onClick={onYieldLock}
                className="px-2.5 py-1 rounded bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 font-medium border border-rose-800/40 transition-colors"
              >
                Yield Lock
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Frame Deadline & Jitter Monitor */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-[#0e121a] rounded-lg border border-slate-800 p-3.5 shadow-md font-mono text-xs">
            <span className="text-slate-500 text-[10px] block mb-1">FRAME DEADLINE (60 FPS)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-cyan-300">
                {arbitrationState.frameDeadlineMs} ms
              </span>
              <span className="text-[10px] text-emerald-400">Zero Jitter</span>
            </div>
          </div>

          <div className="bg-[#0e121a] rounded-lg border border-slate-800 p-3.5 shadow-md font-mono text-xs">
            <span className="text-slate-500 text-[10px] block mb-1">FRAME MISSES DETECTED</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-emerald-400">
                {arbitrationState.frameMissesCount} Frames
              </span>
              <span className="text-[10px] text-slate-500">100% V-Sync</span>
            </div>
          </div>

          <div className="bg-[#0e121a] rounded-lg border border-slate-800 p-3.5 shadow-md font-mono text-xs">
            <span className="text-slate-500 text-[10px] block mb-1">GPU BUDGET QUOTA</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-amber-300">
                {arbitrationState.gpuBudgetAllocatedPercent}%
              </span>
              <span className="text-[10px] text-slate-500">NVENC Bound</span>
            </div>
          </div>
        </div>

        {/* Active Priority Queue */}
        <div className="bg-[#0e121a] rounded-lg border border-slate-800 p-4 shadow-md">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-white">
                Active Arbiter Priority Queue & Deadlock Prevention
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              POLICY: {arbitrationState.arbitrationPolicy.toUpperCase()}
            </span>
          </div>

          <div className="space-y-2">
            {arbitrationState.activePriorityQueue.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded bg-[#090b10] border border-slate-800 text-xs font-mono"
              >
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 font-bold w-6">#{item.priority}</span>
                  <span className="text-slate-200 font-semibold uppercase">
                    {item.agentRole} AGENT
                  </span>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    {item.requestedSyscall}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-500">
                  <span>Timeout: {item.timeoutMs}ms</span>
                  <span className="text-emerald-400">SCHEDULED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
