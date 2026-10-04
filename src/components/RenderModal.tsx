import React, { useState } from 'react';
import { X, Download, CheckCircle2, Film, Layers, Cpu } from 'lucide-react';

interface RenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  aspectRatio: '16:9' | '9:16' | '1:1';
}

export const RenderModal: React.FC<RenderModalProps> = ({ isOpen, onClose, aspectRatio }) => {
  const [selectedFormat, setSelectedFormat] = useState<'av1' | 'prores' | 'h264' | 'edl'>('av1');
  const [renderProgress, setRenderProgress] = useState<number>(0);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [renderDone, setRenderDone] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleStartRender = () => {
    setIsRendering(true);
    setRenderProgress(0);
    setRenderDone(false);

    const interval = setInterval(() => {
      setRenderProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRendering(false);
          setRenderDone(true);
          return 100;
        }
        return prev + 12;
      });
    }, 250);
  };

  const handleDownload = () => {
    // Generate text/binary download
    const filename = `Explainer_Master_${selectedFormat.toUpperCase()}_${Date.now()}.txt`;
    const content = `AGENTIC VIDEO OS - MASTER RENDER EXPORT
Format: ${selectedFormat.toUpperCase()}
Aspect Ratio: ${aspectRatio}
Resolution: ${aspectRatio === '9:16' ? '1080x1920' : '3840x2160'}
Framerate: 60fps
Color Space: BT.709 10-bit
Audio Mastering: -14.2 LUFS Nominal
Sovereign Provenance: 100% Cleared
Timestamp: ${new Date().toISOString()}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none">
      <div className="bg-[#0e121a] border border-slate-800 rounded-xl w-full max-w-lg p-5 shadow-2xl flex flex-col gap-4 text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Render Master Export Matrix</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-slate-400 leading-relaxed">
          Select target codec profile for hardware acceleration and autonomous delivery.
        </p>

        {/* Format Selector */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => setSelectedFormat('av1')}
            className={`p-3 rounded-lg border text-left flex flex-col gap-1 transition-all ${
              selectedFormat === 'av1'
                ? 'bg-[#151b27] border-cyan-500 text-white shadow'
                : 'bg-[#090b10] border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="font-bold text-xs text-cyan-300">AV1 (SVT-AV1 10-bit)</span>
            <span className="text-[10px] text-slate-500 font-mono">
              3840×2160 · CRF 21 · YouTube / Web 4K
            </span>
          </button>

          <button
            onClick={() => setSelectedFormat('prores')}
            className={`p-3 rounded-lg border text-left flex flex-col gap-1 transition-all ${
              selectedFormat === 'prores'
                ? 'bg-[#151b27] border-cyan-500 text-white shadow'
                : 'bg-[#090b10] border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="font-bold text-xs text-amber-300">Apple ProRes 422 HQ</span>
            <span className="text-[10px] text-slate-500 font-mono">
              Uncompressed Master · Cinema Delivery
            </span>
          </button>

          <button
            onClick={() => setSelectedFormat('h264')}
            className={`p-3 rounded-lg border text-left flex flex-col gap-1 transition-all ${
              selectedFormat === 'h264'
                ? 'bg-[#151b27] border-cyan-500 text-white shadow'
                : 'bg-[#090b10] border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="font-bold text-xs text-emerald-300">H.264 9:16 Adaptive</span>
            <span className="text-[10px] text-slate-500 font-mono">
              1080×1920 · TikTok / Shorts / Reels
            </span>
          </button>

          <button
            onClick={() => setSelectedFormat('edl')}
            className={`p-3 rounded-lg border text-left flex flex-col gap-1 transition-all ${
              selectedFormat === 'edl'
                ? 'bg-[#151b27] border-cyan-500 text-white shadow'
                : 'bg-[#090b10] border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="font-bold text-xs text-purple-300">FCPXML / OpenTimelineIO</span>
            <span className="text-[10px] text-slate-500 font-mono">
              Universal NLE Project Manifest
            </span>
          </button>
        </div>

        {/* Render Progress */}
        {isRendering && (
          <div className="bg-[#090b10] rounded-lg border border-slate-800 p-3 space-y-2">
            <div className="flex justify-between font-mono text-slate-300 text-[11px]">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <Cpu className="w-3.5 h-3.5 animate-spin" />
                <span>GPU Render Matrix Active</span>
              </span>
              <span>{renderProgress}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                style={{ width: `${renderProgress}%` }}
                className="bg-cyan-400 h-full rounded-full transition-all duration-200"
              ></div>
            </div>
          </div>
        )}

        {renderDone && (
          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-lg p-3 flex items-center justify-between text-emerald-300 font-mono">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Master Render Generated Successfully</span>
            </span>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 bg-emerald-500 text-slate-950 px-3 py-1 rounded font-bold hover:bg-emerald-400 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
          >
            Cancel
          </button>
          {!renderDone && (
            <button
              onClick={handleStartRender}
              disabled={isRendering}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isRendering ? 'Rendering...' : 'Start Render'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
