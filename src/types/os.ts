/**
 * Agentic Video OS - Core Type Definitions & Sovereign Subsystems
 * Unifying OpenMontage, VideoAgent, Frontstage, Remotion, FFmpeg, GStreamer, WebRTC
 * With 6-Layer Memory Fabric, Kernel Arbiter, TML Compiler, and Constitution Engine
 */

export type KernelType = 'cognitive' | 'video' | 'realtime' | 'semantic' | 'storage';

export interface KernelTelemetry {
  id: KernelType;
  name: string;
  runtime: string; // e.g. 'Python 3.12', 'Rust 1.82 (Tokio)', 'Go 1.23 (Pion)', 'C++20 (GStreamer)', 'VectorDB (Qdrant)'
  status: 'nominal' | 'active' | 'throttled' | 'idle';
  cpuPercent: number;
  gpuPercent: number;
  memoryMb: number;
  activeThreads: number;
  syscallCount: number;
  description: string;
}

export type AgentRole = 'director' | 'writer' | 'editor' | 'sound_designer' | 'qa_compliance' | 'renderer';

export interface AgentInstance {
  id: string;
  role: AgentRole;
  name: string;
  callsign: string;
  avatarColor: string;
  status: 'idle' | 'planning' | 'executing' | 'evaluating' | 'ready';
  currentTask: string;
  assignedKernel: KernelType;
  skillsCount: number;
  temperature: number;
  lastDecision: string;
  model: string;
  metrics: {
    tasksCompleted: number;
    avgLatencyMs: number;
    confidenceScore: number;
  };
}

export type SyscallName =
  | 'sys_ffmpeg_transcode'
  | 'sys_ffmpeg_filtergraph'
  | 'sys_remotion_render'
  | 'sys_whisper_transcribe'
  | 'sys_clip_embed'
  | 'sys_scene_detect'
  | 'sys_gstreamer_pipeline'
  | 'sys_webrtc_broadcast'
  | 'sys_crdt_sync'
  | 'sys_cas_dedup'
  | 'sys_audio_ducking'
  | 'sys_arbitration_lock'
  | 'sys_tml_execute'
  | 'sys_memory_commit';

export interface SyscallLog {
  id: string;
  timestamp: string;
  kernel: KernelType;
  syscall: SyscallName;
  args: Record<string, any>;
  durationMs: number;
  status: 'success' | 'running' | 'failed';
  outputSummary: string;
  artifactId?: string;
  gpuAllocated?: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  agentRole: AgentRole;
  syscall: SyscallName;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  durationMs: number;
  inputs: string[];
  outputs: string[];
  log: string;
}

export interface PipelineManifest {
  id: string;
  name: string;
  tagline: string;
  category: 'Explainer' | 'Shorts / Reels' | 'Documentary' | 'Broadcast' | 'Highlight' | 'Trailer';
  targetDurationSeconds: number;
  stages: PipelineStage[];
  status: 'idle' | 'running' | 'completed';
  currentStageIndex: number;
  aspectRatio: '16:9' | '9:16' | '1:1';
}

export type TrackType = 'video' | 'broll' | 'audio' | 'music' | 'sfx' | 'captions' | 'overlay';

export interface TimelineClip {
  id: string;
  trackId: string;
  title: string;
  startTime: number; // in seconds
  duration: number; // in seconds
  assetId: string;
  sourceIn: number;
  sourceOut: number;
  color: string;
  volume: number; // 0.0 - 2.0
  opacity: number; // 0.0 - 1.0
  speed: number;
  captionText?: string;
  effects: string[];
  sceneType?: 'talking_head' | 'b_roll_macro' | 'cinematic_city' | 'quantum_lab' | 'graphics';
  sentiment?: 'high_energy' | 'informative' | 'urgent' | 'hook' | 'positive';
}

export interface TimelineTrack {
  id: string;
  type: TrackType;
  label: string;
  isMuted: boolean;
  isSolo: boolean;
  isLocked: boolean;
  volume: number;
  clips: TimelineClip[];
}

export interface SemanticScene {
  id: string;
  timeRange: [number, number];
  label: string;
  sentiment: 'positive' | 'urgent' | 'hook' | 'informative';
  energyScore: number; // 0 - 100
  shotType: 'Wide' | 'Close-up' | 'Macro' | 'Overhead' | 'Screen';
  topic: string;
  similarityScore?: number;
}

export interface VideoAsset {
  id: string;
  title: string;
  duration: number;
  resolution: string;
  fps: number;
  sizeMb: number;
  category: string;
  tags: string[];
  transcriptSummary: string;
  colorGradient: string;
  audioPeakDb: number;
  scenes: SemanticScene[];
}

export interface CreatorNode {
  id: string;
  name: string;
  role: 'Creator' | 'Director Agent' | 'Music Producer' | 'Editor Agent' | 'Stock Footage Archive';
  splitPercent: number;
  rightsType: 'Full Ownership' | 'Creative Commons BY' | 'Royalty Free' | 'Autonomous Agent Work';
  reputationScore: number;
  did: string; // Decentralized Identity
}

export interface ConstitutionRule {
  id: string;
  name: string;
  category: 'Pacing' | 'Brand' | 'Audio Norms' | 'Compliance';
  description: string;
  threshold: string;
  currentMetric: string;
  status: 'compliant' | 'warning' | 'breach';
  remediationAction?: string;
}

export type OSShellTarget = 'desktop' | 'web' | 'mobile' | 'edge';

export type TimelineViewMode = 'nle' | 'remotion_code' | 'ffmpeg_filtergraph' | 'adaptive' | 'tml_code';

// ==========================================
// 6-LAYER STUDIO MEMORY FABRIC INTERFACES
// ==========================================

export interface ProjectMemory {
  id: string;
  projectId: string;
  title: string;
  pipelineRunsCount: number;
  timelineVersion: number;
  currentArtifactHash: string;
  artifactDAG: Array<{
    nodeId: string;
    type: 'spec' | 'script' | 'timeline' | 'render' | 'audio_master';
    name: string;
    hash: string;
    parentIds: string[];
    timestamp: string;
  }>;
}

export interface CreatorMemory {
  creatorId: string;
  name: string;
  stylePreferences: {
    hookDurationLimit: number; // e.g. 2.8s
    targetSpeechCadenceWpm: number; // e.g. 144
    targetLoudnessLufs: number; // e.g. -14.2
    preferredColorLUT: string; // e.g. 'Anamorphic Teal & Orange'
    primaryHookPattern: 'Question Shock' | 'Visual Incongruity' | 'Paradox Assertion';
    duckingDepthDb: number; // e.g. -16.5
    captionStyle: 'Kinetic Highlight' | 'Minimalist Bar' | 'Cyberpunk HUD';
  };
  totalVideosProduced: number;
  audienceRetentionMean30s: number; // e.g. 74.2%
}

export interface AgentMemoryItem {
  id: string;
  agentRole: AgentRole;
  insight: string;
  category: 'retention_lift' | 'pacing_tuning' | 'script_clarity' | 'audio_polish';
  historicalEffect: string; // e.g. '+6.4% 30s retention'
  confidence: number; // 0.0 - 1.0
  activeSince: string;
}

export interface AssetMemoryRecord {
  assetId: string;
  assetTitle: string;
  placementsCount: number;
  totalScreenTimeSeconds: number;
  avgEngagementYield: number; // 0 - 100
  bestUsedInPacing: 'hook' | 'climax' | 'explanation';
  licenseCleared: boolean;
}

export interface NarrativeHotspot {
  timestamp: number;
  label: string;
  narrativePressure: number; // 0 - 100
  retentionDropRisk: 'low' | 'moderate' | 'high';
  suggestedAction: string;
}

export interface SemanticMemoryMap {
  topicVectorLabel: string;
  emotionalArc: Array<{ time: number; emotionalValence: number; arousalScore: number }>;
  narrativeHotspots: NarrativeHotspot[];
  crossModalSimilarityIndex: number;
}

export interface AnalyticsMemoryCurve {
  secondBySecondRetention: number[]; // 30 values for 0..30s
  estimatedDropOffPoint: number;
  predictedCompletionRate: number;
  benchmarkVsGenreAvg: number; // +18.4%
  estimatedCtr: number;
}

export interface EvolutionLoopState {
  currentCycle: number;
  status: 'idle' | 'analyzing_run' | 'updating_heuristics' | 'refining_constitution' | 'synced';
  lastCycleTimestamp: string;
  insightsGenerated: number;
  invariantsRefined: number;
  strategiesUpdated: string[];
}

export interface StudioMemoryFabric {
  projectMemory: ProjectMemory;
  creatorMemory: CreatorMemory;
  agentMemory: AgentMemoryItem[];
  assetMemory: AssetMemoryRecord[];
  semanticMemory: SemanticMemoryMap;
  analyticsMemory: AnalyticsMemoryCurve;
  evolutionLoop: EvolutionLoopState;
}

// ==========================================
// KERNEL ARBITRATION LAYER
// ==========================================

export interface KernelArbitrationState {
  timelineLockOwner: AgentRole | 'human_director' | 'arbiter_sync';
  lockAcquiredTimestamp: string;
  activePriorityQueue: Array<{
    agentRole: AgentRole;
    priority: number; // 1 (highest) to 10
    requestedSyscall: SyscallName;
    timeoutMs: number;
  }>;
  gpuBudgetAllocatedPercent: number;
  frameDeadlineMs: number;
  frameMissesCount: number;
  arbitrationPolicy: 'strict_frame_deadline' | 'collaborative_round_robin' | 'human_override';
}

// ==========================================
// TIMELINE MUTATION LANGUAGE (TML)
// ==========================================

export type TMLCommandType = 'INSERT' | 'CUT' | 'SPLIT' | 'DUCK' | 'FRAME' | 'EFFECT' | 'TRANSITION';

export interface TMLStatement {
  raw: string;
  type: TMLCommandType;
  trackId?: string;
  assetId?: string;
  timestamp?: number;
  duration?: number;
  value?: string | number;
  status: 'parsed' | 'executed' | 'failed';
}

export interface TMLProgram {
  sourceCode: string;
  statements: TMLStatement[];
  compilationStatus: 'valid' | 'syntax_error' | 'executing' | 'applied';
  errorMessage?: string;
  appliedDeltasCount: number;
}
