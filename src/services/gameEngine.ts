import { useState, useEffect, useCallback } from 'react';

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'live' | 'idle';
  liveCount: number;
  tokensUsed: number;
}

export interface Run {
  id: string;
  agentId: string;
  type: 'Assignment' | 'Automation';
  status: 'running' | 'queued' | 'completed' | 'cancelled';
  timestamp: string;
  tokens: string;
  task: string;
}

export interface GameState {
  companyName: string;
  funds: number;
  monthlySpend: number;
  totalTokens: number;
  agents: Agent[];
  runs: Run[];
  activeAgentId: string;
  activeTab: string;
  activeSection: 'agents' | 'revenue' | 'org' | 'skills' | 'security' | 'orders';
}

export const useGameEngine = () => {
  const [state, setState] = useState<GameState>({
    companyName: 'Tech Co',
    funds: 250000.00,
    monthlySpend: 12400.00,
    totalTokens: 12500000,
    activeAgentId: 'ceo',
    activeTab: 'Runs',
    activeSection: 'agents',
    agents: [
      { id: 'ceo', name: 'CEO', role: 'Pengawasan Strategis', status: 'live', liveCount: 2, tokensUsed: 980600 },
      { id: 'cmo', name: 'CMO', role: 'Pertumbuhan Pasar', status: 'live', liveCount: 1, tokensUsed: 443800 },
      { id: 'cto', name: 'CTO', role: 'Arsitektur Teknis', status: 'live', liveCount: 1, tokensUsed: 524100 },
      { id: 'engineer', name: 'Insinyur Pendiri', role: 'Pengembangan Fitur', status: 'idle', liveCount: 0, tokensUsed: 0 },
    ],
    runs: [
      { id: '8a6ac81e', agentId: 'ceo', type: 'Assignment', status: 'completed', timestamp: '2 menit lalu', tokens: '980.6rb tok', task: 'Perencanaan Strategis Kuartal 3' },
      { id: '58c475b3', agentId: 'ceo', type: 'Assignment', status: 'completed', timestamp: '3 menit lalu', tokens: '142.1rb tok', task: 'Analisis Peluang Pasar' },
      { id: '40ce5335', agentId: 'ceo', type: 'Assignment', status: 'running', timestamp: '5 menit lalu', tokens: '980.6rb tok', task: 'Membangun pipa perankingan + peringkasan untuk daily digest' },
      { id: '2bdbd0b0', agentId: 'cmo', type: 'Automation', status: 'completed', timestamp: '6 menit lalu', tokens: '443.8rb tok', task: 'Sinkronisasi Sentimen Media Sosial' },
      { id: 'd9e3c6c4', agentId: 'cto', type: 'Assignment', status: 'completed', timestamp: '9 menit lalu', tokens: '524.1rb tok', task: 'Strategi Migrasi Database' },
    ]
  });

  // Simulation: Occasionally add a background automation run or update tokens
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        const randomAgentIndex = Math.floor(Math.random() * 3);
        const randomAgent = prev.agents[randomAgentIndex];
        
        // Randomly update an agent's tokens
        const updatedAgents = [...prev.agents];
        const tokenIncrease = Math.floor(Math.random() * 5000);
        updatedAgents[randomAgentIndex] = {
          ...randomAgent,
          tokensUsed: randomAgent.tokensUsed + tokenIncrease
        };

        // Every few ticks, add a new run
        let updatedRuns = [...prev.runs];
        if (Math.random() > 0.7) {
          const newRun: Run = {
            id: Math.random().toString(36).substring(2, 10),
            agentId: randomAgent.id,
            type: Math.random() > 0.5 ? 'Assignment' : 'Automation',
            status: 'completed',
            timestamp: 'Just now',
            tokens: `${(Math.random() * 100).toFixed(1)}k tok`,
            task: [
              'Code Review: PR-1204',
              'Marketing Blitz: Twitter/X',
              'Backend Patch: Latency Fix',
              'User Testing: Alpha Build',
              'Docs Update: API v4'
            ][Math.floor(Math.random() * 5)]
          };
          updatedRuns = [newRun, ...updatedRuns.slice(0, 15)];
        }

        return {
          ...prev,
          agents: updatedAgents,
          runs: updatedRuns,
          totalTokens: prev.totalTokens + tokenIncrease,
          funds: prev.funds - (tokenIncrease / 100) // Small cost for tokens
        };
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const setActiveAgent = useCallback((id: string) => {
    setState(prev => ({ ...prev, activeAgentId: id }));
  }, []);

  const setActiveTab = useCallback((tab: string) => {
    setState(prev => ({ ...prev, activeTab: tab }));
  }, []);

  const setActiveSection = useCallback((section: GameState['activeSection']) => {
    setState(prev => ({ ...prev, activeSection: section }));
  }, []);

  return {
    state,
    setActiveAgent,
    setActiveTab,
    setActiveSection
  };
};
