import {
  StudioMemoryFabric,
  KernelArbitrationState,
  TMLProgram,
} from '../types/os';

export const INITIAL_MEMORY_FABRIC: StudioMemoryFabric = {
  projectMemory: {
    id: 'proj_mem_001',
    projectId: 'quantum_dilemma_60s',
    title: 'The Quantum Dilemma (60s Explainer)',
    pipelineRunsCount: 3,
    timelineVersion: 4,
    currentArtifactHash: 'blake3_7f9c42b8901e4a2c3d5e6f7a8b9c0d1e',
    artifactDAG: [
      {
        nodeId: 'dag_01_spec',
        type: 'spec',
        name: 'Technical Thesis Specification',
        hash: 'b3_01_9fa2',
        parentIds: [],
        timestamp: '09:20:14',
      },
      {
        nodeId: 'dag_02_script',
        type: 'script',
        name: 'Screenplay & Hook (144 WPM)',
        hash: 'b3_02_e34b',
        parentIds: ['dag_01_spec'],
        timestamp: '09:21:05',
      },
      {
        nodeId: 'dag_03_timeline',
        type: 'timeline',
        name: 'Multi-Track Frontstage NLE Assembly',
        hash: 'b3_03_78cc',
        parentIds: ['dag_02_script'],
        timestamp: '09:22:30',
      },
      {
        nodeId: 'dag_04_ducking',
        type: 'audio_master',
        name: 'Audio Ducking (-16.5dB) & -14.2 LUFS Master',
        hash: 'b3_04_21dd',
        parentIds: ['dag_03_timeline'],
        timestamp: '09:23:45',
      },
      {
        nodeId: 'dag_05_render',
        type: 'render',
        name: 'AV1 4K 60fps Hardware Export',
        hash: 'b3_05_a81f',
        parentIds: ['dag_04_ducking'],
        timestamp: '09:24:12',
      },
    ],
  },

  creatorMemory: {
    creatorId: 'creator_nicholas',
    name: 'Nicholas (Lead Director)',
    stylePreferences: {
      hookDurationLimit: 2.8,
      targetSpeechCadenceWpm: 144,
      targetLoudnessLufs: -14.2,
      preferredColorLUT: 'Anamorphic Teal & Orange',
      primaryHookPattern: 'Question Shock',
      duckingDepthDb: -16.5,
      captionStyle: 'Kinetic Highlight',
    },
    totalVideosProduced: 18,
    audienceRetentionMean30s: 74.2,
  },

  agentMemory: [
    {
      id: 'amem_01',
      agentRole: 'director',
      insight: 'Cutting to high-contrast macro B-roll before 00:03.0 interrupts scroll inertia, yielding +8.4% 15s retention.',
      category: 'retention_lift',
      historicalEffect: '+8.4% 15s retention',
      confidence: 0.94,
      activeSince: 'Run #1',
    },
    {
      id: 'amem_02',
      agentRole: 'writer',
      insight: 'Paradoxical thesis statements ("What if one whisper broke encryption?") outperform generic value propositions by 2.1x CTR.',
      category: 'script_clarity',
      historicalEffect: '+14% hook completion',
      confidence: 0.96,
      activeSince: 'Run #2',
    },
    {
      id: 'amem_03',
      agentRole: 'editor',
      insight: 'Snapping A-Roll cuts to 128 BPM snare beats eliminates visual stutter during scene transitions.',
      category: 'pacing_tuning',
      historicalEffect: 'Zero pacing drop-offs',
      confidence: 0.98,
      activeSince: 'Run #2',
    },
    {
      id: 'amem_04',
      agentRole: 'sound_designer',
      insight: 'Ducking release window of 220ms prevents audible background noise pumping around presenter breathing points.',
      category: 'audio_polish',
      historicalEffect: '-14.2 LUFS nominal clean',
      confidence: 0.99,
      activeSince: 'Run #3',
    },
  ],

  assetMemory: [
    {
      assetId: 'asset_cryostat',
      assetTitle: 'Quantum Cryogenic Chamber In Action',
      placementsCount: 6,
      totalScreenTimeSeconds: 28.8,
      avgEngagementYield: 92.4,
      bestUsedInPacing: 'hook',
      licenseCleared: true,
    },
    {
      assetId: 'asset_host_presenter',
      assetTitle: 'Studio Presenter - Technical Keynote Lead',
      placementsCount: 12,
      totalScreenTimeSeconds: 140.0,
      avgEngagementYield: 86.1,
      bestUsedInPacing: 'explanation',
      licenseCleared: true,
    },
    {
      assetId: 'asset_city_aerial',
      assetTitle: 'Rainy Cyber Metropolis Aerial Twilight',
      placementsCount: 4,
      totalScreenTimeSeconds: 24.8,
      avgEngagementYield: 79.5,
      bestUsedInPacing: 'climax',
      licenseCleared: true,
    },
    {
      assetId: 'asset_microchip_assembly',
      assetTitle: 'Precision Microchip Robotic Placement',
      placementsCount: 5,
      totalScreenTimeSeconds: 27.5,
      avgEngagementYield: 94.0,
      bestUsedInPacing: 'explanation',
      licenseCleared: true,
    },
  ],

  semanticMemory: {
    topicVectorLabel: 'Topological Quantum Error Correction',
    emotionalArc: [
      { time: 0, emotionalValence: 0.2, arousalScore: 0.8 },
      { time: 3.5, emotionalValence: 0.6, arousalScore: 0.85 },
      { time: 12.0, emotionalValence: 0.75, arousalScore: 0.92 },
      { time: 22.0, emotionalValence: 0.88, arousalScore: 0.82 },
      { time: 30.0, emotionalValence: 0.95, arousalScore: 0.75 },
    ],
    narrativeHotspots: [
      {
        timestamp: 2.4,
        label: 'Initial Hook Window Threshold',
        narrativePressure: 88,
        retentionDropRisk: 'low',
        suggestedAction: 'B-roll transition verified; scroll friction countered.',
      },
      {
        timestamp: 8.5,
        label: 'Concept Transition (Surface Codes)',
        narrativePressure: 74,
        retentionDropRisk: 'low',
        suggestedAction: 'Inject kinetic lower-third subtitle to reinforce technical terms.',
      },
      {
        timestamp: 12.0,
        label: 'Hardware Spark Climax',
        narrativePressure: 95,
        retentionDropRisk: 'low',
        suggestedAction: 'Speed ramp 1.25x on robotics arm matches voiceover cadence.',
      },
      {
        timestamp: 21.0,
        label: 'Global Horizon Call to Action',
        narrativePressure: 82,
        retentionDropRisk: 'low',
        suggestedAction: 'Full resolution rain reflections reinforce high-tech sovereign theme.',
      },
    ],
    crossModalSimilarityIndex: 0.912,
  },

  analyticsMemory: {
    secondBySecondRetention: [
      100, 97, 95, 93, 91, 89, 88, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 75,
      74, 73, 73, 72, 72, 71, 71, 71, 70, 70,
    ],
    estimatedDropOffPoint: 28.5,
    predictedCompletionRate: 71.8,
    benchmarkVsGenreAvg: 18.4,
    estimatedCtr: 8.6,
  },

  evolutionLoop: {
    currentCycle: 4,
    status: 'synced',
    lastCycleTimestamp: '09:25:36',
    insightsGenerated: 14,
    invariantsRefined: 5,
    strategiesUpdated: [
      'Pacing threshold tightened from 3.5s to 2.8s based on Run #2 retention telemetry',
      'Sidechain ducking curve automated at -16.5dB with 220ms release window',
      'AV1 multi-pass encode enabled as default for 4K desktop playback',
      'Subtitles bound to 80% safe action rectangle for mobile crop resilience',
    ],
  },
};

export const INITIAL_ARBITRATION_STATE: KernelArbitrationState = {
  timelineLockOwner: 'director',
  lockAcquiredTimestamp: '09:24:00',
  activePriorityQueue: [
    {
      agentRole: 'director',
      priority: 1,
      requestedSyscall: 'sys_tml_execute',
      timeoutMs: 50,
    },
    {
      agentRole: 'editor',
      priority: 2,
      requestedSyscall: 'sys_ffmpeg_filtergraph',
      timeoutMs: 120,
    },
    {
      agentRole: 'sound_designer',
      priority: 3,
      requestedSyscall: 'sys_audio_ducking',
      timeoutMs: 80,
    },
  ],
  gpuBudgetAllocatedPercent: 78.5,
  frameDeadlineMs: 16.6, // 60 FPS guaranteed
  frameMissesCount: 0,
  arbitrationPolicy: 'strict_frame_deadline',
};

export const INITIAL_TML_SCRIPT = `// ==========================================
// Timeline Mutation Language (TML v1.2)
// Golden Path: The Quantum Dilemma 60s
// ==========================================

LOCK_TIMELINE BY AGENT("director") PRIORITY(1)

// Track V1: Primary A-Roll Presenter Sequence
INSERT TRACK("V1") ASSET("asset_host_presenter") AT 0.0s DURATION 8.5s SCENE("talking_head")
INSERT TRACK("V1") ASSET("asset_host_presenter") AT 8.5s DURATION 13.5s SCENE("talking_head")
INSERT TRACK("V1") ASSET("asset_host_presenter") AT 22.0s DURATION 8.0s SCENE("talking_head")

// Track V2: High-Pressure B-Roll Cutaways
INSERT TRACK("V2") ASSET("asset_cryostat") AT 3.5s DURATION 4.8s CUT("hard")
INSERT TRACK("V2") ASSET("asset_microchip_assembly") AT 12.0s DURATION 5.5s SPEED(1.25x)
INSERT TRACK("V2") ASSET("asset_city_aerial") AT 21.0s DURATION 6.2s

// Audio Engineering & Ducking Envelopes
INSERT TRACK("A1") ASSET("vocal_stem") AT 0.0s DURATION 30.0s GAIN(1.0)
INSERT TRACK("A2") ASSET("cyber_score") AT 0.0s DURATION 30.0s GAIN(0.45)
DUCK TRACK("A2") BY -16.5dB DURING TRACK("A1") ATTACK 15ms RELEASE 220ms
TARGET_LOUDNESS -14.2LUFS

// Kinetic HUD Captions
INSERT TRACK("G1") CAPTION("WHAT IF ONE ERROR BROKE ENCRYPTION?") AT 0.0s DURATION 3.5s
INSERT TRACK("G1") CAPTION("Surface Codes: 1000 physical = 1 fault-tolerant logical qubit") AT 8.5s DURATION 6.0s

// Constitution Invariant Verification
AUDIT_CONSTITUTION RULES("OpenMontage_Standard")
RELEASE_LOCK
`;
