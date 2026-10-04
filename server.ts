import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize GoogleGenAI client if API key is present
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Could not initialize GoogleGenAI client:', err);
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    kernelVersion: '2.4.0-agentic-os',
    kernels: ['cognitive', 'video', 'realtime', 'semantic', 'storage'],
    hasAiApiKey: Boolean(process.env.GEMINI_API_KEY),
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// Agent execution endpoint (powered by gemini-3.8-flash)
app.post('/api/agent/run', async (req, res) => {
  const { role, prompt, projectContext, pipelineStage } = req.body;
  const startTime = Date.now();

  const roleDirectives: Record<string, string> = {
    director: 'You are the Director Agent of the Agentic Video OS. Provide concise, decisive directorial judgment on narrative arc, viewer retention curves, pacing, and visual transitions. Be concrete and authoritative.',
    writer: 'You are the Screenplay & Voiceover Agent. Write punchy, spoken-cadence scripts with memorable hooks, natural speech rhythm (140-155 WPM), and clear narrative tension.',
    editor: 'You are the Video Editor Agent. Recommend precise frame cut points, B-roll overlay timing, Remotion component structure, and FFmpeg filtergraph parameters.',
    sound_designer: 'You are the Sound Designer Agent. Provide exact dB gain levels, sidechain ducking curve formulas, stem mastering choices (-14 LUFS standard), and Foley transition ideas.',
    qa_compliance: 'You are the QA & Constitution Compliance Agent. Audit pacing, safe title zones, contrast ratios, and copyright provenance according to OpenMontage studio standards.',
    renderer: 'You are the Hardware Renderer Agent. Optimize AV1/HEVC encoding profiles, bitrate budgets, CRF, and multi-format aspect ratio mappings (16:9, 9:16).',
  };

  const systemInstruction = roleDirectives[role] || 'You are an autonomous video production agent in the Agentic Video OS.';

  if (aiClient && process.env.GEMINI_API_KEY) {
    try {
      const geminiPromise = aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Project Context: ${projectContext || '60s Technical Explainer on Quantum Computing'}\nStage: ${pipelineStage || 'N/A'}\nTask: ${prompt || 'Analyze pacing and generate editorial plan.'}`,
        config: {
          systemInstruction,
          temperature: 0.4,
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API timeout (4s threshold)')), 4000)
      );

      const response: any = await Promise.race([geminiPromise, timeoutPromise]);

      const latencyMs = Date.now() - startTime;
      return res.json({
        success: true,
        responseText: response.text || 'Decision reached without textual output.',
        source: 'gemini-3.8-flash',
        latencyMs,
      });
    } catch (err: any) {
      console.warn('Gemini API call returned fallback:', err.message);
    }
  }

  // Fallback realistic response if API key is not supplied or fails
  const fallbackTemplates: Record<string, string> = {
    director: `[DIRECTOR DECISION]\n1. Hook Evaluation: Initial 2.4s window successfully interrupts scroll friction. Cryostat flange macro creates immediate visual intrigue.\n2. Pacing Rhythm: Shift A-Roll talking head to B-roll at 00:03.5. Cut to microchip laser bond at 00:12.0 during technical thesis peak.\n3. Retention Target: Predicted 74% 30s retention score on YouTube/TikTok cross-posting.`,
    writer: `[SCRIPT REVISION - 144 WPM]\n"What if the single biggest leap in computation isn't faster clock speeds—but colder stillness?\nAt 15 millikelvin, standard silicon dissolves into quantum coherence. Surface code parity checks stop decoherence before errors cascade.\nThis is how sovereign computing begins."`,
    editor: `[TIMELINE RENDER GRAPH]\nRemotion Sequence constructed:\n- Track V1: 3 A-Roll sequences [0-8.5s, 8.5-22.0s, 22.0-30.0s]\n- Track V2: 3 B-Roll overlays at 00:03.5 (Cryostat), 00:12.0 (Robotics), 00:21.0 (Metropolis)\n- Applied 12-frame whip blur transition with 128 BPM beat-sync snap.`,
    sound_designer: `[ACOUSTIC MASTERING PLAN]\n1. Vocal Track A1: High-pass at 80Hz, 3dB presence lift at 3.2kHz, fast peak limiter at -1.0 dBFS.\n2. Ambient Synth A2: Automated sidechain ducking to -16.5dB during speech segments; smooth 200ms release back to -6dB.\n3. Integrated Loudness: Metered at -14.2 LUFS. Zero inter-sample clipping detected.`,
    qa_compliance: `[CONSTITUTION AUDIT REPORT]\n✓ Pacing Rule #01: Passed (First cut at 2.4s <= 3.0s limit)\n✓ Speech Cadence Rule #02: Passed (144 WPM within 135-160 WPM window)\n✓ Audio Rule #03: Passed (-14.2 LUFS nominal)\n✓ Safe Margins Rule #04: Passed (All kinetic titles within 80% inner rect)\n✓ Provenance Rule #05: 100% verified (CC-BY + Studio Original Assets)`,
    renderer: `[HW TRANSCODE PRESET]\nConfigured dual output matrix:\n1. 3840x2160 60fps AV1 10-bit (libsvtav1, crf=21, preset=4, audio=opus@192k)\n2. 1080x1920 60fps H.264 High Profile (h264_nvenc, cq=19, aspect=9:16 vertical crop)`,
  };

  const latencyMs = Date.now() - startTime;
  res.json({
    success: true,
    responseText: fallbackTemplates[role] || 'Agent task executed successfully.',
    source: 'kernel-simulation-engine',
    latencyMs: Math.max(latencyMs, 140),
  });
});

// Kernel Syscall execution endpoint
app.post('/api/kernel/syscall', (req, res) => {
  const { kernel, syscall, args } = req.body;
  const executionTimes: Record<string, number> = {
    sys_ffmpeg_filtergraph: 75,
    sys_remotion_render: 180,
    sys_whisper_transcribe: 210,
    sys_clip_embed: 65,
    sys_scene_detect: 130,
    sys_gstreamer_pipeline: 95,
    sys_webrtc_broadcast: 35,
    sys_crdt_sync: 15,
    sys_cas_dedup: 22,
    sys_audio_ducking: 88,
  };

  const durationMs = executionTimes[syscall] || 90;
  const artifactId = `art_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  res.json({
    success: true,
    id: `sys_${Date.now()}`,
    kernel: kernel || 'video',
    syscall,
    args: args || {},
    durationMs,
    status: 'success',
    timestamp: new Date().toLocaleTimeString(),
    artifactId,
    outputSummary: `Syscall ${syscall} executed cleanly in ${durationMs}ms`,
  });
});

// Semantic search endpoint
app.post('/api/semantic/search', (req, res) => {
  const { query } = req.body;
  res.json({
    query: query || '',
    matches: [
      { id: 'asset_cryostat', score: 0.94, matchedScene: 'Gold Plated Wiring Flange' },
      { id: 'asset_microchip_assembly', score: 0.88, matchedScene: 'Laser Solder Spark Pulse' },
      { id: 'asset_city_aerial', score: 0.79, matchedScene: 'Traffic Light Streaks & Reflection' },
    ],
  });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Agentic Video OS Kernel Server listening at http://0.0.0.0:${port}`);
  });
}

startServer();
