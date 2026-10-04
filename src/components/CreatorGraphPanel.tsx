import React, { useState } from 'react';
import { CreatorNode, ConstitutionRule } from '../types/os';
import {
  ShieldCheck,
  Coins,
  Scale,
  CheckCircle,
  AlertTriangle,
  Users,
  Percent,
  Sliders,
  Sparkles,
} from 'lucide-react';

interface CreatorGraphPanelProps {
  creators: CreatorNode[];
  setCreators: React.Dispatch<React.SetStateAction<CreatorNode[]>>;
  constitution: ConstitutionRule[];
  setConstitution: React.Dispatch<React.SetStateAction<ConstitutionRule[]>>;
  onAuditConstitution: () => Promise<void>;
  isAuditing: boolean;
}

export const CreatorGraphPanel: React.FC<CreatorGraphPanelProps> = ({
  creators,
  setCreators,
  constitution,
  setConstitution,
  onAuditConstitution,
  isAuditing,
}) => {
  const totalSplit = creators.reduce((acc, curr) => acc + curr.splitPercent, 0);

  const handleSplitChange = (id: string, newPercent: number) => {
    setCreators((prev) =>
      prev.map((c) => (c.id === id ? { ...c, splitPercent: Math.max(0, Math.min(100, newPercent)) } : c))
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#0b0e14] border border-slate-800 rounded-lg overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#10141e] border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-cyan-400" />
            <span>Creator Graph & Sovereign Media Governance</span>
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-xs text-slate-400 font-mono">Decentralized Rights & Policy</span>
        </div>

        <button
          onClick={onAuditConstitution}
          disabled={isAuditing}
          className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>{isAuditing ? 'Auditing Constitution...' : 'Audit Project'}</span>
        </button>
      </div>

      {/* Main Grid: Left Revenue Splits, Right Studio Constitution */}
      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 bg-[#080a0f]">
        {/* Creator Identity & Revenue Splits Card */}
        <div className="bg-[#0e121a] rounded-lg border border-slate-800 p-4 flex flex-col gap-3.5 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold text-white">Attribution & Autonomous Splits</h3>
            </div>
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded border ${
                Math.round(totalSplit) === 100
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50'
                  : 'bg-rose-950/60 text-rose-300 border-rose-800/50'
              }`}
            >
              Total Allocated: {totalSplit.toFixed(1)}% / 100%
            </span>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Encodes contractual royalty distributions between human creators, autonomous agent processes, licensed
            composers, and stock footage repositories.
          </p>

          <div className="space-y-3">
            {creators.map((node) => (
              <div
                key={node.id}
                className="bg-[#090b10] rounded-lg border border-slate-800/80 p-3 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-xs text-slate-200">{node.name}</span>
                    <span className="block text-[10px] font-mono text-slate-500">
                      {node.role} · {node.rightsType}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/30">
                    {node.splitPercent.toFixed(1)}%
                  </span>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.5"
                  value={node.splitPercent}
                  onChange={(e) => handleSplitChange(node.id, parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Studio Constitution Rules Card */}
        <div className="bg-[#0e121a] rounded-lg border border-slate-800 p-4 flex flex-col gap-3.5 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-white">OpenMontage Studio Constitution</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
              5/5 INVARIANTS PASS
            </span>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Non-negotiable ethical, brand, pacing, and acoustic rules enforced automatically before any render
            artifact is signed and published.
          </p>

          <div className="space-y-2.5">
            {constitution.map((rule) => (
              <div
                key={rule.id}
                className="bg-[#090b10] rounded-lg border border-slate-800/80 p-3 flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-200">{rule.name}</span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                    <CheckCircle className="w-3 h-3" />
                    <span>{rule.status.toUpperCase()}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">{rule.description}</p>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800/50">
                  <span>Threshold: {rule.threshold}</span>
                  <span className="text-cyan-400 font-semibold">{rule.currentMetric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
