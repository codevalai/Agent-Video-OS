import React, { useState } from 'react';
import { VideoAsset, SemanticScene, TimelineTrack, TimelineClip } from '../types/os';
import {
  Search,
  Database,
  Film,
  Plus,
  Sparkles,
  Tag,
  Clock,
  Layers,
  CheckCircle,
} from 'lucide-react';

interface SemanticDbPanelProps {
  assets: VideoAsset[];
  onInsertClipToTimeline: (asset: VideoAsset, scene: SemanticScene) => void;
  currentTime: number;
}

export const SemanticDbPanel: React.FC<SemanticDbPanelProps> = ({
  assets,
  onInsertClipToTimeline,
  currentTime,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [justAddedSceneId, setJustAddedSceneId] = useState<string | null>(null);

  const categories = ['All', 'Laboratory / Hardware', 'Keynote / A-Roll', 'B-Roll / Cinematic', 'Robotics / Manufacturing'];

  // Filter assets and scenes based on query and category
  const filteredAssets = assets.filter((asset) => {
    const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesTitle = asset.title.toLowerCase().includes(query);
    const matchesTags = asset.tags.some((t) => t.toLowerCase().includes(query));
    const matchesTranscript = asset.transcriptSummary.toLowerCase().includes(query);
    const matchesScene = asset.scenes.some(
      (s) =>
        s.label.toLowerCase().includes(query) ||
        s.topic.toLowerCase().includes(query) ||
        s.shotType.toLowerCase().includes(query)
    );

    return matchesCategory && (matchesTitle || matchesTags || matchesTranscript || matchesScene);
  });

  const handleAdd = (asset: VideoAsset, scene: SemanticScene) => {
    onInsertClipToTimeline(asset, scene);
    setJustAddedSceneId(scene.id);
    setTimeout(() => setJustAddedSceneId(null), 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[#0b0e14] border border-slate-800 rounded-lg overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#10141e] border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Semantic Video DB & Video Memory System</span>
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-xs text-slate-400 font-mono">Qdrant Vector Mesh</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>INDEXED: 4 ARCHIVES</span>
          <span>·</span>
          <span>EMBEDDINGS: 512-DIM OPENCLIP</span>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="p-3 bg-[#0d1017] border-b border-slate-800 flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by semantic concept (e.g. 'cryostat blue light', 'robotic microchip spark', 'presenter explaining quantum')..."
            className="w-full bg-[#121622] border border-slate-800 focus:border-cyan-500/80 rounded pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none font-mono"
          />
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto text-xs pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asset Cards Grid */}
      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 xl:grid-cols-2 gap-4 bg-[#080a0f]">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-[#0e121a] rounded-lg border border-slate-800 p-3.5 flex flex-col gap-3 shadow-md hover:border-slate-700 transition-colors"
          >
            {/* Asset Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded bg-gradient-to-br ${asset.colorGradient} flex items-center justify-center border border-white/10 shrink-0`}
                >
                  <Film className="w-4 h-4 text-white/80" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">{asset.title}</h4>
                  <span className="text-[10px] font-mono text-slate-500">
                    {asset.category} · {asset.resolution} · {asset.fps}fps · {asset.duration}s
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40 shrink-0">
                {asset.sizeMb} MB
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed italic bg-[#07090e] p-2 rounded border border-slate-800/50">
              "{asset.transcriptSummary}"
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {asset.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono text-slate-400 bg-[#121622] px-1.5 py-0.5 rounded border border-slate-800"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Semantic Scenes Breakdown */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-800/80">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Detected Shots & Scene Boundaries
              </span>
              <div className="space-y-1.5">
                {asset.scenes.map((scene) => {
                  const sceneDuration = scene.timeRange[1] - scene.timeRange[0];
                  const wasAdded = justAddedSceneId === scene.id;

                  return (
                    <div
                      key={scene.id}
                      className="flex items-center justify-between p-2 rounded bg-[#07090e] border border-slate-800/70 hover:border-slate-700 text-xs transition-colors"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-950/40 px-1 rounded">
                          {scene.shotType}
                        </span>
                        <span className="text-slate-200 font-medium truncate">{scene.label}</span>
                        <span className="text-[10px] font-mono text-slate-500">
                          ({sceneDuration.toFixed(1)}s)
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono text-emerald-400">
                          Energy: {scene.energyScore}%
                        </span>
                        <button
                          onClick={() => handleAdd(asset, scene)}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                            wasAdded
                              ? 'bg-emerald-500 text-slate-950 font-bold'
                              : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700'
                          }`}
                          title={`Insert scene at current playhead (${currentTime.toFixed(1)}s)`}
                        >
                          {wasAdded ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <Plus className="w-3 h-3" />
                          )}
                          <span>{wasAdded ? 'Added!' : 'Add to Cut'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
