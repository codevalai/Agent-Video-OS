import React, { useState } from 'react';
import { StudioMemoryFabric, EvolutionLoopState } from '../types/os';
import {
  Brain,
  History,
  User,
  Bot,
  Film,
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Activity,
  Layers,
  BarChart3,
} from 'lucide-react';

interface MemoryFabricPanelProps {
  memoryFabric: StudioMemoryFabric;
  setMemoryFabric: React.Dispatch<React.SetStateAction<StudioMemoryFabric>>;
  onTriggerEvolutionCycle: () => Promise<void>;
  isEvolving: boolean;
}

export const MemoryFabricPanel: React.FC<MemoryFabricPanelProps> = ({
  memoryFabric,
  setMemoryFabric,
  onTriggerEvolutionCycle,
  isEvolving,
}) => {
  const [activeMemoryTab, setActiveMemoryTab] = useState<
    'project' | 'creator' | 'agent' | 'asset' | 'semantic' | 'analytics'
  >('semantic');

  const {
    projectMemory,
    creatorMemory,
    agentMemory,
    assetMemory,
    semanticMemory,
    analyticsMemory,
    evolutionLoop,
  } = memoryFabric;

  return (
    <div className="flex flex-col h-full bg-[#0b0e14] border border-slate-800 rounded-lg overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#10141e] border-b border-slate-800/80 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-cyan-400" />
            <span>Studio Memory Fabric & Long-Term Intelligence</span>
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-xs text-slate-400 font-mono">6 Unified Memory Layers</span>
        </div>

        {/* Evolution Loop Trigger */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>CYCLE #{evolutionLoop.currentCycle} ACTIVE</span>
          </div>

          <button
            onClick={onTriggerEvolutionCycle}
            disabled={isEvolving}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors ${
              isEvolving
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 cursor-wait'
                : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40'
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${isEvolving ? 'animate-spin' : ''}`} />
            <span>{isEvolving ? 'Evolving Memory Fabric...' : 'Run Evolution Loop'}</span>
          </button>
        </div>
      </div>

      {/* Memory Layer Navigation Bar */}
      <div className="flex items-center gap-1 px-3 py-1.5 bg-[#0d1017] border-b border-slate-800 text-xs overflow-x-auto shrink-0">
        <button
          onClick={() => setActiveMemoryTab('semantic')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors whitespace-nowrap ${
            activeMemoryTab === 'semantic'
              ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Semantic & Narrative Arc</span>
        </button>

        <button
          onClick={() => setActiveMemoryTab('analytics')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors whitespace-nowrap ${
            activeMemoryTab === 'analytics'
              ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Analytics & Retention</span>
        </button>

        <button
          onClick={() => setActiveMemoryTab('creator')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors whitespace-nowrap ${
            activeMemoryTab === 'creator'
              ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Creator Preferences</span>
        </button>

        <button
          onClick={() => setActiveMemoryTab('agent')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors whitespace-nowrap ${
            activeMemoryTab === 'agent'
              ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>Agent Learnings</span>
        </button>

        <button
          onClick={() => setActiveMemoryTab('asset')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors whitespace-nowrap ${
            activeMemoryTab === 'asset'
              ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          <span>Asset Yield Memory</span>
        </button>

        <button
          onClick={() => setActiveMemoryTab('project')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors whitespace-nowrap ${
            activeMemoryTab === 'project'
              ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Project DAG & Versions</span>
        </button>
      </div>

      {/* Main Content Viewport */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#080a0f] space-y-4">
        {/* TAB 1: SEMANTIC & NARRATIVE ARC MEMORY */}
        {activeMemoryTab === 'semantic' && (
          <div className="space-y-4">
            {/* Hotspots Card */}
            <div className="bg-[#0e121a] rounded-lg border border-slate-800 p-4 shadow-md">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-bold text-white">
                    Narrative Pressure & Retention Hotspots
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  TOPIC: {semanticMemory.topicVectorLabel}
                </span>
              </div>

              {/* Narrative Pressure Visual Wave */}
              <div className="bg-[#07090e] rounded p-3 border border-slate-800/70 mb-4">
                <span className="text-[10px] font-mono uppercase text-slate-500 block mb-2">
                  Second-by-Second Narrative Pressure Index (0 - 30s)
                </span>
                <div className="flex items-end gap-1 h-20 pt-2">
                  {Array.from({ length: 30 }).map((_, sec) => {
                    // Match narrative hotspot pressure
                    const matchingHotspot = semanticMemory.narrativeHotspots.find(
                      (h) => Math.abs(h.timestamp - sec) <= 1.5
                    );
                    const heightPercent = matchingHotspot
                      ? matchingHotspot.narrativePressure
                      : 40 + Math.sin(sec * 0.4) * 20;

                    return (
                      <div
                        key={sec}
                        className="flex-1 bg-slate-800 hover:bg-cyan-400 transition-colors rounded-t relative group flex flex-col justify-end"
                        style={{ height: `${heightPercent}%` }}
                      >
                        {sec % 5 === 0 && (
                          <span className="text-[9px] font-mono text-slate-500 absolute -bottom-4 left-0">
                            {sec}s
                          </span>
                        )}
                        {matchingHotspot && (
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mx-auto -mt-1 shadow-sm"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Hotspots Breakdown */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-500 block">
                  Identified Cognitive Friction & Retention Gates
                </span>
                {semanticMemory.narrativeHotspots.map((spot, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded bg-[#090b10] border border-slate-800 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800/50">
                        {spot.timestamp.toFixed(1)}s
                      </span>
                      <div>
                        <span className="font-semibold text-slate-200">{spot.label}</span>
                        <p className="text-[11px] text-slate-400 leading-snug">
                          {spot.suggestedAction}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[10px] shrink-0">
                      <span className="text-slate-400">Pressure: {spot.narrativePressure}%</span>
                      <span className="text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/30">
                        {spot.retentionDropRisk.toUpperCase()} RISK
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ANALYTICS & RETENTION MEMORY */}
        {activeMemoryTab === 'analytics' && (
          <div className="space-y-4">
            <div className="bg-[#0e121a] rounded-lg border border-slate-800 p-4 shadow-md">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold text-white">
                    Learned Retention Curves & Predictive Engagement
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  +{analyticsMemory.benchmarkVsGenreAvg}% ABOVE GENRE BENCHMARK
                </span>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4 font-mono text-xs">
                <div className="bg-[#090b10] p-3 rounded border border-slate-800">
                  <span className="text-slate-500 text-[10px] block mb-1">
                    PREDICTED COMPLETION
                  </span>
                  <span className="text-base font-bold text-emerald-400">
                    {analyticsMemory.predictedCompletionRate}%
                  </span>
                </div>
                <div className="bg-[#090b10] p-3 rounded border border-slate-800">
                  <span className="text-slate-500 text-[10px] block mb-1">ESTIMATED CTR</span>
                  <span className="text-base font-bold text-cyan-300">
                    {analyticsMemory.estimatedCtr}%
                  </span>
                </div>
                <div className="bg-[#090b10] p-3 rounded border border-slate-800">
                  <span className="text-slate-500 text-[10px] block mb-1">
                    ESTIMATED DROP-OFF
                  </span>
                  <span className="text-base font-bold text-amber-300">
                    {analyticsMemory.estimatedDropOffPoint}s
                  </span>
                </div>
                <div className="bg-[#090b10] p-3 rounded border border-slate-800">
                  <span className="text-slate-500 text-[10px] block mb-1">ALGORITHM SCORE</span>
                  <span className="text-base font-bold text-purple-300">A+ Tier</span>
                </div>
              </div>

              {/* Retention Curve Graph */}
              <div className="bg-[#07090e] rounded p-3 border border-slate-800/70">
                <span className="text-[10px] font-mono uppercase text-slate-500 block mb-2">
                  Second-by-Second Projected Audience Retention Curve
                </span>
                <div className="flex items-end gap-1 h-24 pt-2">
                  {analyticsMemory.secondBySecondRetention.map((val, sec) => (
                    <div
                      key={sec}
                      className="flex-1 bg-emerald-500/20 hover:bg-emerald-400 border-t-2 border-emerald-400 transition-colors relative flex flex-col justify-end"
                      style={{ height: `${val}%` }}
                    >
                      {sec % 5 === 0 && (
                        <span className="text-[9px] font-mono text-slate-500 absolute -bottom-4 left-0">
                          {sec}s
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CREATOR PREFERENCES MEMORY */}
        {activeMemoryTab === 'creator' && (
          <div className="space-y-4">
            <div className="bg-[#0e121a] rounded-lg border border-slate-800 p-4 shadow-md">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-bold text-white">
                    Creator Style Memory & Fingerprint
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {creatorMemory.name} · {creatorMemory.totalVideosProduced} Projects
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#090b10] p-3 rounded border border-slate-800 flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-500">
                    Hook & Pacing Constraints
                  </span>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Maximum Hook Duration:</span>
                    <span className="text-cyan-300 font-bold">
                      {creatorMemory.stylePreferences.hookDurationLimit}s
                    </span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Target Speech Cadence:</span>
                    <span className="text-cyan-300 font-bold">
                      {creatorMemory.stylePreferences.targetSpeechCadenceWpm} WPM
                    </span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Preferred Hook Pattern:</span>
                    <span className="text-amber-300 font-bold">
                      {creatorMemory.stylePreferences.primaryHookPattern}
                    </span>
                  </div>
                </div>

                <div className="bg-[#090b10] p-3 rounded border border-slate-800 flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-500">
                    Acoustic & Visual Grading
                  </span>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Integrated Target Loudness:</span>
                    <span className="text-emerald-300 font-bold">
                      {creatorMemory.stylePreferences.targetLoudnessLufs} LUFS
                    </span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Sidechain Ducking Depth:</span>
                    <span className="text-emerald-300 font-bold">
                      {creatorMemory.stylePreferences.duckingDepthDb} dB
                    </span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Color Grading LUT:</span>
                    <span className="text-purple-300 font-bold">
                      {creatorMemory.stylePreferences.preferredColorLUT}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AGENT LEARNINGS MEMORY */}
        {activeMemoryTab === 'agent' && (
          <div className="space-y-4">
            <div className="bg-[#0e121a] rounded-lg border border-slate-800 p-4 shadow-md">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-bold text-white">
                    Agent Memory & Distilled Production Heuristics
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {agentMemory.length} Learned Strategies
                </span>
              </div>

              <div className="space-y-2.5">
                {agentMemory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded bg-[#090b10] border border-slate-800 flex flex-col gap-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-300 font-mono">
                        {item.agentRole.toUpperCase()} AGENT HEURISTIC
                      </span>
                      <div className="flex items-center gap-2 font-mono text-[10px]">
                        <span className="text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800/40">
                          {item.historicalEffect}
                        </span>
                        <span className="text-slate-400">
                          Confidence: {(item.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{item.insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ASSET YIELD MEMORY */}
        {activeMemoryTab === 'asset' && (
          <div className="space-y-4">
            <div className="bg-[#0e121a] rounded-lg border border-slate-800 p-4 shadow-md">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-bold text-white">
                    Asset Placement Yield & Performance Memory
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {assetMemory.length} Assets Tracked
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {assetMemory.map((asset) => (
                  <div
                    key={asset.assetId}
                    className="p-3 rounded bg-[#090b10] border border-slate-800 flex flex-col justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="font-semibold text-slate-200 block truncate">
                        {asset.assetTitle}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        ID: {asset.assetId} · Cleared: {asset.licenseCleared ? 'YES' : 'NO'}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 font-mono text-[10px] pt-2 border-t border-slate-800">
                      <div>
                        <span className="text-slate-500 block">Yield</span>
                        <span className="text-emerald-400 font-bold">
                          {asset.avgEngagementYield}%
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Uses</span>
                        <span className="text-cyan-300 font-bold">{asset.placementsCount}x</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Best Slot</span>
                        <span className="text-amber-300 font-bold uppercase">
                          {asset.bestUsedInPacing}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PROJECT DAG & VERSIONS MEMORY */}
        {activeMemoryTab === 'project' && (
          <div className="space-y-4">
            <div className="bg-[#0e121a] rounded-lg border border-slate-800 p-4 shadow-md">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-bold text-white">
                    Project Lineage & Artifact DAG Tree
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">
                  HASH: {projectMemory.currentArtifactHash.slice(0, 18)}...
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {projectMemory.artifactDAG.map((node, i) => (
                  <div
                    key={node.nodeId}
                    className="p-2.5 rounded bg-[#090b10] border border-slate-800 flex items-center justify-between text-slate-300"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800/40">
                        {node.type.toUpperCase()}
                      </span>
                      <span className="font-semibold text-slate-200">{node.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500">
                      <span>Hash: {node.hash}</span>
                      <span>Time: {node.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EVOLUTION LOOP STATUS CARD (Always Visible at bottom) */}
        <div className="bg-[#0e121a] rounded-lg border border-slate-800 p-4 shadow-md">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-white">Evolution Loop Progress & Feedback</h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              STATUS: {evolutionLoop.status.toUpperCase()}
            </span>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            The studio evolution loop continuously evaluates render outcomes, queries viewer drop-off analytics,
            distills new heuristics into Agent Memory, and automatically refines Constitution invariants.
          </p>

          <div className="space-y-1.5 text-xs font-mono">
            {evolutionLoop.strategiesUpdated.map((strat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 rounded bg-[#090b10] border border-slate-800 text-slate-300 text-[11px]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{strat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
