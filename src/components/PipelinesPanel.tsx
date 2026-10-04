import React, { useState } from 'react';
import { PipelineManifest, PipelineStage } from '../types/os';
import {
  Play,
  RotateCcw,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Terminal,
  FileCode,
  Layers,
  Cpu,
} from 'lucide-react';

interface PipelinesPanelProps {
  pipelines: PipelineManifest[];
  activePipelineId: string;
  setActivePipelineId: (id: string) => void;
  onExecuteStage: (pipelineId: string, stageId: string) => Promise<void>;
  onRunFullPipeline: (pipelineId: string) => Promise<void>;
  isProcessing: boolean;
}

export const PipelinesPanel: React.FC<PipelinesPanelProps> = ({
  pipelines,
  activePipelineId,
  setActivePipelineId,
  onExecuteStage,
  onRunFullPipeline,
  isProcessing,
}) => {
  const currentPipeline = pipelines.find((p) => p.id === activePipelineId) || pipelines[0];
  const [selectedStageId, setSelectedStageId] = useState<string | null>(
    currentPipeline.stages[0]?.id || null
  );

  const selectedStage =
    currentPipeline.stages.find((s) => s.id === selectedStageId) || currentPipeline.stages[0];

  return (
    <div className="flex flex-col h-full bg-[#0b0e14] border border-slate-800 rounded-lg overflow-hidden select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#10141e] border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>OpenMontage Pipeline Engine</span>
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-xs text-slate-400 font-mono">{currentPipeline.category}</span>
        </div>

        {/* Pipeline Execution Triggers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onRunFullPipeline(currentPipeline.id)}
            disabled={isProcessing}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors ${
              isProcessing
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 cursor-wait'
                : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40'
            }`}
          >
            <Sparkles className="w-3 h-3 text-cyan-300" />
            <span>{isProcessing ? 'Executing Stages...' : 'Run Full Pipeline'}</span>
          </button>
        </div>
      </div>

      {/* Main Body: Catalog Sidebar & Stage Graph */}
      <div className="flex-1 flex overflow-hidden">
        {/* Pipeline Catalog List */}
        <div className="w-64 bg-[#0d1017] border-r border-slate-800 p-2.5 flex flex-col gap-1.5 overflow-y-auto shrink-0">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-2 py-1">
            Pipeline Manifests (12 cataloged)
          </span>
          {pipelines.map((pipe) => {
            const isSelected = pipe.id === currentPipeline.id;
            const completedCount = pipe.stages.filter((s) => s.status === 'completed').length;
            const progressPercent = Math.round((completedCount / pipe.stages.length) * 100);

            return (
              <button
                key={pipe.id}
                onClick={() => {
                  setActivePipelineId(pipe.id);
                  setSelectedStageId(pipe.stages[0]?.id || null);
                }}
                className={`flex flex-col text-left p-2.5 rounded transition-all border ${
                  isSelected
                    ? 'bg-[#151a26] border-cyan-500/50 text-white shadow-sm'
                    : 'border-transparent hover:bg-slate-900/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-semibold text-xs truncate">{pipe.name}</span>
                  <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/60 px-1 rounded border border-cyan-800/40">
                    {pipe.targetDurationSeconds}s
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 mb-2 leading-relaxed">
                  {pipe.tagline}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                  <div
                    style={{ width: `${progressPercent}%` }}
                    className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                  ></div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Pipeline Stage Sequence Flowchart */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-[#080a0f] p-4">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/80">
            <div>
              <h3 className="text-sm font-semibold text-white">{currentPipeline.name}</h3>
              <p className="text-xs text-slate-400">{currentPipeline.tagline}</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span>Target: {currentPipeline.targetDurationSeconds}s</span>
              <span>·</span>
              <span>Aspect: {currentPipeline.aspectRatio}</span>
              <span>·</span>
              <span>Stages: {currentPipeline.stages.length}</span>
            </div>
          </div>

          {/* Sequential Stages List */}
          <div className="flex flex-col gap-2.5 mb-6">
            {currentPipeline.stages.map((stage, idx) => {
              const isSelected = selectedStage?.id === stage.id;

              return (
                <div
                  key={stage.id}
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#121622] border-cyan-500/60 ring-1 ring-cyan-500/30'
                      : 'bg-[#0c0f16] border-slate-800/70 hover:border-slate-700'
                  }`}
                >
                  {/* Status Indicator Icon */}
                  <div className="mt-0.5 shrink-0">
                    {stage.status === 'completed' ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : stage.status === 'active' ? (
                      <span className="relative flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
                      </span>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-mono text-slate-400">
                        {idx + 1}
                      </div>
                    )}
                  </div>

                  {/* Stage Summary */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-slate-200 truncate">
                        {stage.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                          {stage.agentRole.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-900">
                          {stage.syscall}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 mb-1.5 leading-relaxed">
                      {stage.description}
                    </p>

                    {/* Output Artifact and Log preview */}
                    <div className="text-[10px] font-mono text-slate-500 bg-[#07090e] p-1.5 rounded border border-slate-800/60">
                      <span className="text-slate-400 font-semibold">LOG:</span> {stage.log}
                    </div>
                  </div>

                  {/* Stage Execute Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onExecuteStage(currentPipeline.id, stage.id);
                    }}
                    disabled={isProcessing}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-slate-300 border border-slate-700 shrink-0 self-center transition-colors"
                  >
                    Run Step
                  </button>
                </div>
              );
            })}
          </div>

          {/* Selected Stage Detail Inspector */}
          {selectedStage && (
            <div className="bg-[#0e121a] rounded-lg border border-slate-800 p-3.5 mt-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-200">
                  Stage Inspector: {selectedStage.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Estimated Latency: {selectedStage.durationMs}ms
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2 rounded bg-[#090b10] border border-slate-800">
                  <span className="text-[10px] uppercase text-slate-500 block mb-1">
                    Inputs Consumed
                  </span>
                  <ul className="text-slate-300 text-[11px] space-y-0.5">
                    {selectedStage.inputs.map((inItem, i) => (
                      <li key={i}>• {inItem}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-2 rounded bg-[#090b10] border border-slate-800">
                  <span className="text-[10px] uppercase text-slate-500 block mb-1">
                    Artifacts Emitted
                  </span>
                  <ul className="text-cyan-300 text-[11px] space-y-0.5">
                    {selectedStage.outputs.map((outItem, i) => (
                      <li key={i}>✓ {outItem}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
