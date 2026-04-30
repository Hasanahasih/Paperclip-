import React from 'react';
import { 
  Plus, 
  Play, 
  Pause, 
  ChevronRight,
  MoreHorizontal,
  X,
  Target,
  Terminal,
  Cpu,
  Zap,
  Bot
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Run, Agent } from '../services/gameEngine';
import { GoogleGenAI } from "@google/genai";

interface AgentPortalProps {
  game: any;
}

const tabs = ['Dasbor', 'Instruksi', 'Keahlian', 'Konfigurasi', 'Daftar Tugas', 'Anggaran'];

export default function AgentPortal({ game }: AgentPortalProps) {
  const { state, setActiveTab } = game;
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [aiResponse, setAiResponse] = React.useState<string | null>(null);

  const activeAgent = state.agents.find((a: Agent) => a.id === state.activeAgentId);
  const filteredRuns = state.runs.filter((r: Run) => r.agentId === state.activeAgentId);
  const activeRun = filteredRuns.find((r: Run) => r.status === 'running') || filteredRuns[0];

  const handleRunHeartbeat = async () => {
    if (!process.env.GEMINI_API_KEY) {
      alert("Harap atur GEMINI_API_KEY Anda di pengaturan environment untuk mengaktifkan fitur AI.");
      return;
    }

    setIsProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Tugas: ${activeRun?.task || "Operasi umum"}. Sebagai ${activeAgent?.name} dengan peran ${activeAgent?.role}, berikan laporan status profesional dan langkah tindakan dalam bahasa Indonesia menggunakan format markdown.`,
        config: {
          systemInstruction: `Anda adalah ${activeAgent?.name}, agen AI dengan peran: ${activeAgent?.role}. Laksanakan tugas saat ini secara mandiri.`,
        }
      });
      setAiResponse(response.text || "Tugas selesai tanpa output.");
    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse("Error: Tautan ke Neural Engine gagal. Periksa konfigurasi API.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0d0d0d] text-zinc-300">
      {/* Top Bar */}
      <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0a]">
        <div className="flex items-center gap-2 text-[13px] font-medium">
          <span className="text-zinc-500 hover:text-zinc-300 cursor-pointer">Agen</span>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
          <span className="text-zinc-500 hover:text-zinc-300 cursor-pointer">{activeAgent?.name}</span>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
          <span className="text-zinc-100">{state.activeTab}</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/80 hover:bg-zinc-700 text-white rounded-md text-[13px] font-medium border border-white/5 transition-all">
            <Plus className="w-4 h-4" />
            Tugaskan
          </button>
          <button 
            disabled={isProcessing}
            onClick={handleRunHeartbeat}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 border border-white/10 text-zinc-200 rounded-md text-[13px] font-medium transition-all",
              isProcessing ? "opacity-50 cursor-not-allowed bg-white/5" : "hover:bg-white/5"
            )}
          >
            <Play className={cn("w-3.5 h-3.5 fill-current", isProcessing && "animate-pulse")} />
            {isProcessing ? "Berpikir..." : "Jalankan Detak Jantung"}
          </button>
          <button className="p-1.5 border border-white/10 hover:bg-white/5 rounded-md text-zinc-400">
            <Pause className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 px-2 py-1 bg-blue-500/10 rounded border border-blue-500/20">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
             <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest">Berjalan</span>
          </div>
          <button className="p-1 text-zinc-600 hover:text-zinc-400">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Hero Agent Section */}
      <div className="px-6 py-6 border-b border-white/5 bg-[#0a0a0a]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-zinc-800 border border-white/10 rounded-lg flex items-center justify-center">
             <Terminal className="w-6 h-6 text-zinc-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
               <h1 className="text-xl font-bold text-white tracking-tight">{activeAgent?.name}</h1>
               <span className="text-[11px] text-zinc-600 font-mono italic">#{activeAgent?.id?.toUpperCase()}</span>
            </div>
            <p className="text-[12px] text-zinc-500 uppercase tracking-widest font-bold">{activeAgent?.role}</p>
          </div>
        </div>

        {/* Tabs */}
        <nav className="flex gap-8 mt-8 border-b border-white/5 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 text-[13px] font-medium transition-all relative",
                state.activeTab === tab 
                  ? "text-white" 
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {tab}
              {state.activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_-4px_10px_rgba(255,255,255,0.3)]" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Grid Content (Simulation of "Runs" tab) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Runs List */}
        <div className="w-[380px] border-r border-white/5 flex flex-col bg-[#0d0d0d]">
          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {filteredRuns.map((run: Run) => (
              <div 
                key={run.id} 
                className={cn(
                  "p-4 cursor-pointer transition-all hover:bg-white/[0.02]",
                  run.id === activeRun?.id ? "bg-white/[0.03]" : ""
                )}
              >
                <div className="flex justify-between items-start mb-2">
                   <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        run.status === 'running' ? "bg-blue-500 animate-pulse" : "bg-emerald-500"
                      )} />
                      <span className="text-[11px] font-mono text-zinc-500">{run.id}</span>
                   </div>
                   <span className="text-[11px] text-zinc-600 font-medium">{run.timestamp}</span>
                </div>
                
                <div className="flex items-center justify-between mb-1">
                   <span className="text-[13px] font-medium text-zinc-100">{run.type === 'Assignment' ? 'Tugas' : 'Otomatisasi'}</span>
                   <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest bg-zinc-800/50 px-1.5 py-0.5 rounded">
                      {run.tokens}
                   </span>
                </div>
                <p className="text-[12px] text-zinc-500 truncate leading-relaxed italic">
                   {run.task}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Run Details */}
        <div className="flex-1 bg-black p-8 overflow-y-auto">
           <div className="max-w-3xl mx-auto space-y-12">
              <div className="flex items-center justify-between">
                 <div className="flex gap-4">
                    <div className="px-3 py-1 bg-zinc-800/50 rounded flex items-center gap-2">
                       <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                          {isProcessing ? 'memproses' : 'antrean'}
                       </span>
                    </div>
                    {!isProcessing && (
                      <button className="text-[11px] font-bold text-red-500/80 uppercase tracking-widest hover:text-red-500 transition-colors">
                        Batal
                      </button>
                    )}
                 </div>
              </div>

              <div className="space-y-6">
                 <div>
                    <h3 className="text-[12px] font-bold text-zinc-600 uppercase tracking-widest mb-4">Isu Terkait (1)</h3>
                    <div className="flex items-center gap-4 bg-zinc-900/30 border border-white/5 p-4 rounded-xl group hover:border-white/10 transition-all">
                       <div className="px-2 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase rounded">perlu dikerjakan</div>
                       <p className="text-[14px] text-zinc-300 font-medium">{activeRun?.task}</p>
                       <div className="flex-1" />
                       <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest group-hover:text-zinc-400">TECA-7</span>
                    </div>
                 </div>

                 <div>
                    <h3 className="text-[12px] font-bold text-zinc-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                       Log Eksekusi {isProcessing && <Zap className="w-3 h-3 text-amber-500 animate-bounce" />}
                    </h3>
                    
                    {aiResponse ? (
                      <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl font-mono text-[13px] leading-relaxed text-zinc-300">
                         <div className="flex items-center gap-2 text-amber-500 mb-4 pb-2 border-b border-white/5">
                            <Bot className="w-4 h-4" />
                            <span className="text-[10px] uppercase font-black italic tracking-widest">Output Kecerdasan Otonom</span>
                         </div>
                         {aiResponse}
                      </div>
                    ) : (
                      <div className="h-64 border border-zinc-900 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
                         <Zap className="w-8 h-8 text-zinc-800" />
                         <p className="text-zinc-600 font-medium italic text-[14px]">
                            {isProcessing ? "Membangun tautan saraf dengan Gemini..." : "Belum ada log aktif."}
                         </p>
                         <p className="text-zinc-800 text-[11px] uppercase tracking-widest font-bold">Tautan Saraf Aktif</p>
                      </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
