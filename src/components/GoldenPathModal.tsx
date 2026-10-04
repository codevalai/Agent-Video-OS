import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, Cpu, ArrowRight, Play, Film, Shield, Brain } from 'lucide-react';

interface GoldenPathModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteGoldenPath: () => void;
}

export const GoldenPathModal: React.FC<GoldenPathModalProps> = ({
  isOpen,
  onClose,
  onCompleteGoldenPath,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const steps = [
    {
      title: '1. Cognitive Intent Formulation',
      kernel: 'Cognitive Kernel (Gemini 3.8)',
      detail: 'Generated directorial thesis: 15-millikelvin cryostat hook, 144 WPM spoken cadence.',
    },
    {
      title: '2. Director Intent Compiler to TML',
      kernel: 'Cognitive -> TML Compiler',
      detail: 'Synthesized 12 TML statements with hard-cut B-roll and automated sidechain ducking.',
    },
    {
      title: '3. Kernel Arbitration Write Mutex',
      kernel: 'Kernel Arbiter',
      detail: 'Acquired exclusive timeline write lock for DIR-01 (Priority 1). Guaranteed 16.6ms frame budget.',
    },
    {
      title: '4. Universal Timeline Engine Assembly',
      kernel: 'Video Kernel (Rust)',
      detail: 'Mutated tracks V1 (A-Roll), V2 (Cryostat + Microchip), A1 (Voiceover), and A2 (Synth Score).',
    },
    {
      title: '5. Sound Designer Ducking & Mastering',
      kernel: 'Video & Audio Kernel',
      detail: 'Applied -16.5dB ducking envelope during dialogue; mastered integrated loudness to -14.2 LUFS.',
    },
    {
      title: '6. Agent Constitution Audit',
      kernel: 'QA Compliance Agent',
      detail: 'Audited 5/5 studio invariants: Hook < 3.0s, Cadence 144 WPM, -14.2 LUFS, WCAG AAA caption contrast.',
    },
    {
      title: '7. Semantic Fusion & Pressure Map',
      kernel: 'Semantic Kernel (OpenCLIP)',
      detail: 'Indexed narrative pressure map across 30 seconds; verified peak retention at frame 72.',
    },
    {
      title: '8. Memory Fabric DAG Commit',
      kernel: 'Storage & CAS Kernel',
      detail: 'Committed BLAKE3 episode hash to Project Memory; distilled +8.4% hook heuristic into Agent Memory.',
    },
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setIsRunning(false);
      setIsFinished(false);
    }
  }, [isOpen]);

  const handleStartGoldenPath = () => {
    setIsRunning(true);
    setCurrentStep(1);

    let step = 1;
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      if (step >= steps.length) {
        clearInterval(interval);
        setIsRunning(false);
        setIsFinished(true);
      }
    }, 450);
  };

  const handleApplyAndPlay = () => {
    onCompleteGoldenPath();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none">
      <div className="bg-[#0e121a] border border-cyan-500/40 rounded-xl w-full max-w-2xl p-5 shadow-2xl flex flex-col gap-4 text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              Golden Path: The Quantum Dilemma 60s End-to-End Runbook
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-slate-300 leading-relaxed">
          Executes the complete sovereign stack: Cognitive Kernel (Gemini) → Intent Compiler → TML →
          Kernel Arbiter → Video Engine → Render DAG → Constitution Audit → Semantic Fusion → Studio
          Memory Fabric.
        </p>

        {/* Step-by-step progress cards */}
        <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
          {steps.map((step, idx) => {
            const stepNum = idx + 1;
            const isCurrent = currentStep === stepNum;
            const isCompleted = currentStep > stepNum || isFinished;

            return (
              <div
                key={idx}
                className={`p-2.5 rounded-lg border transition-all text-xs flex items-start gap-3 ${
                  isCompleted
                    ? 'bg-[#09151c] border-emerald-500/40 text-slate-200'
                    : isCurrent
                    ? 'bg-[#151c2b] border-cyan-500 text-white ring-1 ring-cyan-500/40'
                    : 'bg-[#090b10] border-slate-800/80 text-slate-500'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <Cpu className="w-4 h-4 text-cyan-400 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-mono">
                      {stepNum}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-200">{step.title}</span>
                    <span className="text-[10px] font-mono text-cyan-400">{step.kernel}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{step.detail}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="font-mono text-slate-400 text-[11px]">
            {isFinished
              ? '✓ Sovereign Stack Pipeline Executed 100%'
              : isRunning
              ? `Executing Step ${currentStep} of ${steps.length}...`
              : 'Ready to dispatch to all 5 kernels'}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
            >
              Cancel
            </button>
            {!isFinished ? (
              <button
                onClick={handleStartGoldenPath}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isRunning ? 'Executing Runbook...' : 'Run Golden Path'}</span>
              </button>
            ) : (
              <button
                onClick={handleApplyAndPlay}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold transition-colors shadow-lg"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Load Master Cut & Play</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
