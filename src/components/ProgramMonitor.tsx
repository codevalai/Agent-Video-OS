import React, { useRef, useEffect, useState } from 'react';
import { TimelineTrack, TimelineClip, VideoAsset, TimelineViewMode } from '../types/os';
import {
  Play,
  Pause,
  Maximize2,
  Code,
  Terminal,
  Radio,
  Tv,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  CheckCircle2,
  Copy,
} from 'lucide-react';

interface ProgramMonitorProps {
  currentTime: number;
  setCurrentTime: (t: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  tracks: TimelineTrack[];
  assets: VideoAsset[];
  aspectRatio: '16:9' | '9:16' | '1:1';
  setAspectRatio: (ar: '16:9' | '9:16' | '1:1') => void;
  viewMode: TimelineViewMode;
  setViewMode: (mode: TimelineViewMode) => void;
}

export const ProgramMonitor: React.FC<ProgramMonitorProps> = ({
  currentTime,
  setCurrentTime,
  isPlaying,
  onTogglePlay,
  tracks,
  assets,
  aspectRatio,
  setAspectRatio,
  viewMode,
  setViewMode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Find currently active clips at currentTime
  const activeBrollClip = tracks
    .find((t) => t.id === 'track_v2')
    ?.clips.find((c) => currentTime >= c.startTime && currentTime < c.startTime + c.duration);

  const activeArollClip = tracks
    .find((t) => t.id === 'track_v1')
    ?.clips.find((c) => currentTime >= c.startTime && currentTime < c.startTime + c.duration);

  const activeCaptionClip = tracks
    .find((t) => t.id === 'track_captions')
    ?.clips.find((c) => currentTime >= c.startTime && currentTime < c.startTime + c.duration);

  // The displayed clip prioritizes B-Roll (V2) over A-Roll (V1)
  const currentVisualClip = activeBrollClip || activeArollClip;

  // Real-time canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const renderFrame = () => {
      const width = canvas.width;
      const height = canvas.height;
      const time = currentTime;

      // Background base
      ctx.fillStyle = '#06080d';
      ctx.fillRect(0, 0, width, height);

      if (currentVisualClip) {
        const sceneType = currentVisualClip.sceneType || 'talking_head';

        if (sceneType === 'quantum_lab') {
          // Quantum Cryostat Simulation
          const grad = ctx.createRadialGradient(
            width * 0.5,
            height * 0.45,
            20,
            width * 0.5,
            height * 0.5,
            width * 0.6
          );
          grad.addColorStop(0, '#0e7490');
          grad.addColorStop(0.5, '#082f49');
          grad.addColorStop(1, '#030712');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          // Cryogenic chamber cylinder
          ctx.save();
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.ellipse(width * 0.5, height * 0.5, 140, 190, 0, 0, Math.PI * 2);
          ctx.stroke();

          // Concentric gold flanges
          for (let i = 1; i <= 4; i++) {
            ctx.beginPath();
            ctx.ellipse(width * 0.5, height * (0.3 + i * 0.1), 120 - i * 15, 20, 0, 0, Math.PI * 2);
            ctx.strokeStyle = i % 2 === 0 ? '#fbbf24' : '#38bdf8';
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          // Cryo pulse particles
          const particleCount = 24;
          for (let p = 0; p < particleCount; p++) {
            const angle = (p / particleCount) * Math.PI * 2 + time * 0.8;
            const radius = 60 + Math.sin(time * 3 + p) * 40;
            const px = width * 0.5 + Math.cos(angle) * radius;
            const py = height * 0.5 + Math.sin(angle) * radius * 0.6;
            ctx.fillStyle = p % 2 === 0 ? '#67e8f9' : '#fef08a';
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        } else if (sceneType === 'cinematic_city') {
          // Cyberpunk rain metropolis
          const grad = ctx.createLinearGradient(0, 0, 0, height);
          grad.addColorStop(0, '#0f172a');
          grad.addColorStop(0.6, '#311042');
          grad.addColorStop(1, '#0a0a14');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          // Skyline buildings
          ctx.fillStyle = '#090d16';
          for (let b = 0; b < 10; b++) {
            const bx = b * (width / 9) - 20;
            const bh = 140 + Math.sin(b * 1.7) * 70;
            const bw = width / 9 + 10;
            ctx.fillRect(bx, height - bh, bw, bh);

            // Windows
            ctx.fillStyle = b % 2 === 0 ? '#f43f5e' : '#06b6d4';
            for (let wy = height - bh + 20; wy < height - 20; wy += 25) {
              for (let wx = bx + 10; wx < bx + bw - 15; wx += 20) {
                if ((wx + wy + Math.floor(time * 2)) % 3 === 0) {
                  ctx.fillRect(wx, wy, 6, 8);
                }
              }
            }
            ctx.fillStyle = '#090d16';
          }

          // Rain streaks
          ctx.strokeStyle = 'rgba(147, 197, 253, 0.25)';
          ctx.lineWidth = 1;
          for (let r = 0; r < 40; r++) {
            const rx = (r * 37 + time * 320) % width;
            const ry = (r * 53 + time * 480) % height;
            ctx.beginPath();
            ctx.moveTo(rx, ry);
            ctx.lineTo(rx - 8, ry + 22);
            ctx.stroke();
          }
        } else if (sceneType === 'b_roll_macro') {
          // Microchip laser robotic placement
          const grad = ctx.createRadialGradient(
            width * 0.5,
            height * 0.5,
            10,
            width * 0.5,
            height * 0.5,
            width * 0.5
          );
          grad.addColorStop(0, '#064e3b');
          grad.addColorStop(0.7, '#022c22');
          grad.addColorStop(1, '#020617');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          // Silicon circuit bus lines
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 1.5;
          for (let l = 0; l < 8; l++) {
            ctx.beginPath();
            ctx.moveTo(0, height * 0.2 + l * 35);
            ctx.lineTo(width * 0.35, height * 0.2 + l * 35);
            ctx.lineTo(width * 0.45 + l * 10, height * 0.45 + l * 15);
            ctx.lineTo(width, height * 0.45 + l * 15);
            ctx.stroke();
          }

          // Robotic microchip head
          ctx.fillStyle = '#1e293b';
          ctx.strokeStyle = '#34d399';
          ctx.lineWidth = 2;
          ctx.fillRect(width * 0.4, height * 0.35, width * 0.2, height * 0.3);
          ctx.strokeRect(width * 0.4, height * 0.35, width * 0.2, height * 0.3);

          // Laser bonding spark pulses
          const sparkTime = Math.sin(time * 12);
          if (sparkTime > 0.4) {
            ctx.fillStyle = '#fef08a';
            ctx.beginPath();
            ctx.arc(width * 0.5, height * 0.5, 12, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = '#fbbf24';
            for (let s = 0; s < 8; s++) {
              const sa = (s / 8) * Math.PI * 2 + time * 5;
              ctx.beginPath();
              ctx.moveTo(width * 0.5, height * 0.5);
              ctx.lineTo(width * 0.5 + Math.cos(sa) * 28, height * 0.5 + Math.sin(sa) * 28);
              ctx.stroke();
            }
          }
        } else {
          // Talking Head Studio A-Roll
          const grad = ctx.createRadialGradient(
            width * 0.5,
            height * 0.4,
            30,
            width * 0.5,
            height * 0.5,
            width * 0.7
          );
          grad.addColorStop(0, '#332008');
          grad.addColorStop(0.6, '#1a140d');
          grad.addColorStop(1, '#090b10');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          // Acoustic studio slats in background
          ctx.fillStyle = '#1c1917';
          for (let s = 20; s < width; s += 45) {
            ctx.fillRect(s, 20, 16, height - 40);
          }

          // Presenter silhouette / avatar circle
          ctx.save();
          ctx.fillStyle = '#292524';
          ctx.beginPath();
          ctx.arc(width * 0.5, height * 0.42, 70, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Torso
          ctx.fillStyle = '#1c1917';
          ctx.beginPath();
          ctx.ellipse(width * 0.5, height * 0.85, 130, 90, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Spoken mouth movement simulator
          if (isPlaying) {
            const mouthOpen = 4 + Math.sin(time * 18) * 3;
            ctx.fillStyle = '#78350f';
            ctx.beginPath();
            ctx.ellipse(width * 0.5, height * 0.47, 12, mouthOpen, 0, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      }

      // Audio waveform spectrum visualizer at bottom of frame
      ctx.save();
      const barCount = 42;
      const barWidth = width / barCount - 2;
      for (let i = 0; i < barCount; i++) {
        const factor = Math.sin(time * 6 + i * 0.35) * Math.cos(i * 0.2);
        const barHeight = isPlaying ? Math.abs(factor) * 28 + 4 : 4;
        const bx = i * (barWidth + 2);
        const by = height - barHeight - 8;
        ctx.fillStyle = i < 28 ? 'rgba(56, 189, 248, 0.65)' : 'rgba(245, 158, 11, 0.75)';
        ctx.fillRect(bx, by, barWidth, barHeight);
      }
      ctx.restore();

      // Subtitles & Captions Overlay
      if (activeCaptionClip && activeCaptionClip.captionText) {
        ctx.save();
        const text = activeCaptionClip.captionText;
        ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';

        const textMetrics = ctx.measureText(text);
        const boxWidth = textMetrics.width + 36;
        const boxHeight = 44;
        const boxX = (width - boxWidth) / 2;
        const boxY = height - 85;

        // Dark translucent pill backdrop
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.strokeStyle = 'rgba(234, 179, 8, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fef08a';
        ctx.fillText(text, width / 2, boxY + 28);
        ctx.restore();
      }

      // Safe margin guides HUD (subtle hairpins)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.strokeRect(width * 0.05, height * 0.05, width * 0.9, height * 0.9);
      ctx.strokeRect(width * 0.1, height * 0.1, width * 0.8, height * 0.8);

      if (isPlaying) {
        animationFrameId = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [currentTime, isPlaying, currentVisualClip, activeCaptionClip]);

  // Code generator for Remotion TSX mode
  const generatedRemotionCode = `import { Composition, Sequence, Audio, Video, interpolate, useCurrentFrame } from 'remotion';

export const ExplainerVideo: React.FC = () => {
  return (
    <Composition
      id="ExplainerMainSequence"
      component={MainScene}
      durationInFrames={1800} // 60s @ 30fps
      fps={30}
      width={${aspectRatio === '9:16' ? 1080 : 1920}}
      height={${aspectRatio === '9:16' ? 1920 : 1080}}
      defaultProps={{
        hookText: "${activeCaptionClip?.captionText || 'What if one error broke encryption?'}",
        activeScene: "${currentVisualClip?.title || 'Quantum Cryostat'}",
        duckingDb: -16.5,
      }}
    />
  );
};

const MainScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ flex: 1, backgroundColor: '#06080d', opacity }}>
      {/* V1 A-Roll Narrative Sequence */}
      <Sequence from={0} durationInFrames={255}>
        <Video src="assets/host_presenter.mp4" />
      </Sequence>

      {/* V2 B-Roll Cut at 00:03.5 */}
      <Sequence from={105} durationInFrames={144}>
        <Video src="assets/cryostat_macro.mp4" />
      </Sequence>

      {/* A2 Background Score with Ducking */}
      <Audio src="audio/cyber_pulse_score.wav" volume={(f) => (f < 300 ? 0.35 : 0.8)} />
    </div>
  );
};`;

  // Code generator for FFmpeg Filtergraph
  const generatedFFmpegFiltergraph = `# OpenMontage Hardware Optimized Filtergraph (NVENC 4K)
ffmpeg -y \\
  -ss 0.0 -t 30.0 -i input_aroll.mp4 \\
  -ss 6.2 -t 4.8 -i input_cryostat.mp4 \\
  -ss 1.0 -t 5.5 -i input_robotics.mp4 \\
  -i audio_voiceover.wav \\
  -i audio_score.wav \\
  -filter_complex "\\
    [0:v]scale=3840:2160:force_original_aspect_ratio=decrease,pad=3840:2160:(ow-iw)/2:(oh-ih)/2[base];\\
    [1:v]scale=3840:2160[broll1];\\
    [2:v]scale=3840:2160[broll2];\\
    [base][broll1]overlay=enable='between(t,3.5,8.3)'[v_temp1];\\
    [v_temp1][broll2]overlay=enable='between(t,12.0,17.5)'[out_v];\\
    [4:a]volume=0.35,sidechaincompress=threshold=0.15:ratio=6:attack=20:release=250[bg_music];\\
    [3:a][bg_music]amix=inputs=2:duration=first:dropout_transition=2[out_a]" \\
  -map "[out_v]" -map "[out_a]" \\
  -c:v h264_nvenc -preset p7 -cq 18 -b:v 32M \\
  -c:a aac -b:a 320k \\
  output_explainer_master.mp4`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex flex-col bg-[#0b0e14] border border-slate-800 rounded-lg overflow-hidden h-full">
      {/* Monitor Header with Mode Switcher */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#10141e] border-b border-slate-800/80 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Tv className="w-3.5 h-3.5 text-cyan-400" />
            <span>Program Monitor</span>
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-xs text-slate-400 font-mono">
            {currentVisualClip?.title || 'Black Frame'}
          </span>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-1 bg-[#090b10] p-0.5 rounded border border-slate-800 text-xs">
          <button
            onClick={() => setViewMode('nle')}
            className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
              viewMode === 'nle'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tv className="w-3 h-3" />
            <span>Canvas</span>
          </button>
          <button
            onClick={() => setViewMode('remotion_code')}
            className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
              viewMode === 'remotion_code'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-3 h-3" />
            <span>Remotion TSX</span>
          </button>
          <button
            onClick={() => setViewMode('ffmpeg_filtergraph')}
            className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
              viewMode === 'ffmpeg_filtergraph'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>FFmpeg</span>
          </button>
          <button
            onClick={() => setViewMode('adaptive')}
            className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
              viewMode === 'adaptive'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-3 h-3" />
            <span>WebRTC Live</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Content */}
      <div className="flex-1 relative flex items-center justify-center bg-[#07090e] p-3 overflow-hidden min-h-[300px]">
        {viewMode === 'nle' && (
          <div
            className={`relative rounded border border-slate-800 shadow-2xl overflow-hidden bg-black transition-all ${
              aspectRatio === '16:9'
                ? 'w-full max-w-[640px] aspect-video'
                : aspectRatio === '9:16'
                ? 'h-full max-h-[460px] aspect-[9/16]'
                : 'w-full max-w-[420px] aspect-square'
            }`}
          >
            <canvas
              ref={canvasRef}
              width={640}
              height={360}
              className="w-full h-full object-contain block"
            />

            {/* Live Status Tag */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/75 border border-slate-800 text-[10px] font-mono text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>RENDER: OK · 60fps</span>
            </div>

            {/* Resolution Tag */}
            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/75 border border-slate-800 text-[10px] font-mono text-slate-300">
              3840×2160 AV1
            </div>
          </div>
        )}

        {viewMode === 'remotion_code' && (
          <div className="w-full h-full flex flex-col bg-[#090c13] rounded border border-slate-800 p-3 overflow-hidden text-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
              <span className="font-mono text-slate-400">Composition.tsx (Remotion React Engine)</span>
              <button
                onClick={() => copyToClipboard(generatedRemotionCode)}
                className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                {copiedCode ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode ? 'Copied' : 'Copy TSX'}</span>
              </button>
            </div>
            <pre className="flex-1 overflow-auto font-mono text-slate-300 text-[11px] leading-relaxed p-2 bg-[#06080d] rounded">
              {generatedRemotionCode}
            </pre>
          </div>
        )}

        {viewMode === 'ffmpeg_filtergraph' && (
          <div className="w-full h-full flex flex-col bg-[#090c13] rounded border border-slate-800 p-3 overflow-hidden text-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
              <span className="font-mono text-slate-400">FFmpeg 7.0 CLI Filtergraph Pipeline</span>
              <button
                onClick={() => copyToClipboard(generatedFFmpegFiltergraph)}
                className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                {copiedCode ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode ? 'Copied' : 'Copy Script'}</span>
              </button>
            </div>
            <pre className="flex-1 overflow-auto font-mono text-amber-300 text-[11px] leading-relaxed p-2 bg-[#06080d] rounded">
              {generatedFFmpegFiltergraph}
            </pre>
          </div>
        )}

        {viewMode === 'adaptive' && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#090c13] rounded border border-slate-800 p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-3">
              <Radio className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">WebRTC Live Showrunner Broadcast</h4>
            <p className="text-xs text-slate-400 max-w-md mb-4">
              Real-time multi-peer preview session active via Pion WebRTC mesh. Low latency (18ms) with automated
              director camera-switching rules.
            </p>
            <div className="flex items-center gap-3 font-mono text-xs text-slate-300 bg-[#06080d] px-4 py-2 rounded border border-slate-800">
              <span>PEERS: 3 CONNECTED</span>
              <span>·</span>
              <span className="text-emerald-400">RTT: 18ms</span>
              <span>·</span>
              <span>CODEC: VP9 / OPUS</span>
            </div>
          </div>
        )}
      </div>

      {/* Monitor Footer Controls */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#10141e] border-t border-slate-800/80 shrink-0 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentTime(Math.max(0, currentTime - 1))}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Step Back 1s"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onTogglePlay}
            className={`p-1.5 rounded transition-colors ${
              isPlaying ? 'bg-amber-500/20 text-amber-300' : 'bg-cyan-500/20 text-cyan-300'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
          <button
            onClick={() => setCurrentTime(Math.min(30, currentTime + 1))}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Step Forward 1s"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Aspect Ratio Switcher */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 text-[11px]">Framing:</span>
          {(['16:9', '9:16', '1:1'] as const).map((ratio) => (
            <button
              key={ratio}
              onClick={() => setAspectRatio(ratio)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                aspectRatio === ratio
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
