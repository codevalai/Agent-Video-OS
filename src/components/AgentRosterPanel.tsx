import React, { useState } from 'react';
import { AgentInstance, AgentRole } from '../types/os';
import {
  Bot,
  Send,
  Sparkles,
  Zap,
  Activity,
  CheckCircle2,
  Clock,
  Terminal,
  Shield,
  Sliders,
} from 'lucide-react';

interface AgentRosterPanelProps {
  agents: AgentInstance[];
  onDispatchAgentPrompt: (role: AgentRole, prompt: string) => Promise<{
    responseText: string;
    source: string;
    latencyMs: number;
  }>;
}

export const AgentRosterPanel: React.FC<AgentRosterPanelProps> = ({
  agents,
  onDispatchAgentPrompt,
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0].id);
  const [promptInput, setPromptInput] = useState<string>('');
  const [isCallingAgent, setIsCallingAgent] = useState<boolean>(false);
  const [conversationLogs, setConversationLogs] = useState<
    Array<{
      id: string;
      agentCallsign: string;
      role: AgentRole;
      userPrompt: string;
      agentResponse: string;
      source: string;
      latencyMs: number;
      timestamp: string;
    }>
  >([
    {
      id: 'log_0',
      agentCallsign: 'DIR-01',
      role: 'director',
      userPrompt: 'Review the 3.5s transition into the cryostat B-roll.',
      agentResponse:
        'The cut at 00:03.5 is approved. The visual contrast between the warm studio lighting of the presenter and the cool cyan cryostat creates high narrative momentum without breaking speaker cadence.',
      source: 'gemini-3.8-flash',
      latencyMs: 240,
      timestamp: '09:23:40',
    },
  ]);

  const activeAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];

  const handleSendPrompt = async () => {
    if (!promptInput.trim() || isCallingAgent) return;
    const currentPrompt = promptInput.trim();
    setPromptInput('');
    setIsCallingAgent(true);

    try {
      const res = await onDispatchAgentPrompt(activeAgent.role, currentPrompt);
      const newEntry = {
        id: `conv_${Date.now()}`,
        agentCallsign: activeAgent.callsign,
        role: activeAgent.role,
        userPrompt: currentPrompt,
        agentResponse: res.responseText,
        source: res.source,
        latencyMs: res.latencyMs,
        timestamp: new Date().toLocaleTimeString(),
      };
      setConversationLogs((prev) => [newEntry, ...prev]);
    } catch (err) {
      console.error('Agent invocation failed:', err);
    } finally {
      setIsCallingAgent(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0b0e14] border border-slate-800 rounded-lg overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#10141e] border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>Autonomous Agent Studio Roster (ViMax / VideoAgent)</span>
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-xs text-slate-400 font-mono">6 Agents Active</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>MULTI-AGENT CONSENSUS: NOMINAL</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Agent Selector Cards */}
        <div className="w-72 bg-[#0d1017] border-r border-slate-800 p-2.5 flex flex-col gap-2 overflow-y-auto shrink-0">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-2">
            Specialized Production Agents
          </span>
          {agents.map((agent) => {
            const isSelected = agent.id === selectedAgentId;

            return (
              <button
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`flex flex-col text-left p-3 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-[#141924] border-cyan-500/60 text-white shadow-md'
                    : 'bg-[#090c13] border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${agent.avatarColor}`}
                    ></div>
                    <span className="font-semibold text-xs text-slate-200">{agent.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1 rounded">
                    {agent.callsign}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 mb-2 leading-relaxed">
                  {agent.currentTask}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800/60">
                  <span>Skills: {agent.skillsCount}</span>
                  <span>Conf: {agent.metrics.confidenceScore}%</span>
                  <span>{agent.assignedKernel}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Active Agent Workspace & Command Terminal */}
        <div className="flex-1 flex flex-col bg-[#080a0f] p-4 overflow-hidden">
          {/* Agent Header Card */}
          <div className="bg-[#0e121a] rounded-lg border border-slate-800 p-3 mb-4 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-4 h-4 rounded-full bg-gradient-to-r ${activeAgent.avatarColor} shadow`}
                ></div>
                <h3 className="text-sm font-bold text-white">{activeAgent.name}</h3>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                  {activeAgent.callsign} · {activeAgent.role.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                <span>Kernel: {activeAgent.assignedKernel}</span>
                <span>·</span>
                <span>Model: {activeAgent.model}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-2 leading-relaxed">
              <span className="text-slate-500 font-mono">LATEST DECISION:</span>{' '}
              {activeAgent.lastDecision}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              <div className="bg-[#090b10] px-2 py-1 rounded border border-slate-800 text-slate-400">
                Tasks Completed:{' '}
                <span className="text-slate-200">{activeAgent.metrics.tasksCompleted}</span>
              </div>
              <div className="bg-[#090b10] px-2 py-1 rounded border border-slate-800 text-slate-400">
                Avg Latency:{' '}
                <span className="text-cyan-300">{activeAgent.metrics.avgLatencyMs}ms</span>
              </div>
              <div className="bg-[#090b10] px-2 py-1 rounded border border-slate-800 text-slate-400">
                Temperature: <span className="text-amber-300">{activeAgent.temperature}</span>
              </div>
            </div>
          </div>

          {/* Interactive Agent Chat History */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Live Directives & Execution Logs
            </span>
            {conversationLogs.map((log) => (
              <div
                key={log.id}
                className="bg-[#0c0f16] rounded-lg border border-slate-800/80 p-3 text-xs flex flex-col gap-2"
              >
                {/* User Prompt */}
                <div className="flex items-start justify-between gap-2 pb-1.5 border-b border-slate-800/60 text-slate-300">
                  <span className="font-semibold text-cyan-400 font-mono">DIRECTOR_COMMAND:</span>
                  <span className="flex-1 text-slate-200">{log.userPrompt}</span>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0">
                    {log.timestamp}
                  </span>
                </div>

                {/* Agent Response */}
                <div className="text-slate-300 leading-relaxed whitespace-pre-wrap font-mono text-[11px] bg-[#07090e] p-2 rounded border border-slate-800/40">
                  {log.agentResponse}
                </div>

                {/* Footer metadata */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                  <span>Engine: {log.source}</span>
                  <span>Execution: {log.latencyMs}ms</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box to Dispatch Commands to this Agent */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-800 shrink-0">
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
              placeholder={`Instruct ${activeAgent.name} (e.g. "Evaluate transition rhythm" or "Tighten voiceover hook")...`}
              disabled={isCallingAgent}
              className="flex-1 bg-[#10141e] border border-slate-800 focus:border-cyan-500/80 rounded px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
            />
            <button
              onClick={handleSendPrompt}
              disabled={!promptInput.trim() || isCallingAgent}
              className={`flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold transition-colors ${
                !promptInput.trim() || isCallingAgent
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isCallingAgent ? 'Thinking...' : 'Instruct'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
