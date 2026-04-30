import React from 'react';
import { 
  Inbox, 
  AlertCircle, 
  RotateCcw, 
  Target, 
  Plus, 
  Search,
  Users,
  Settings,
  Activity,
  DollarSign,
  Briefcase,
  Cpu,
  UserCheck,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Agent } from '../services/gameEngine';

interface SidebarProps {
  game: any;
}

export default function Sidebar({ game }: SidebarProps) {
  const { state, setActiveAgent, setActiveSection } = game;

  const NavItem = ({ icon: Icon, label, badge, active, onClick, statusIcon }: any) => (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-3 py-1.5 rounded-md transition-all group",
        active ? "bg-zinc-800/50 text-white" : "text-zinc-500 hover:text-zinc-300"
      )}
    >
      <div className="flex items-center gap-2.5">
        <Icon className={cn("w-4 h-4", active ? "text-white" : "text-zinc-600 group-hover:text-zinc-400")} />
        <span className="text-[13px] font-medium leading-none">{label}</span>
      </div>
      <div className="flex items-center gap-1.5">
        {statusIcon && statusIcon}
        {badge && (
          <span className={cn(
            "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
            active ? "bg-white text-black" : "bg-zinc-800 text-zinc-400"
          )}>
            {badge}
          </span>
        )}
      </div>
    </button>
  );

  const SectionHeader = ({ label, showPlus }: any) => (
    <div className="flex items-center justify-between px-3 mt-6 mb-2">
      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">{label}</span>
      {showPlus && <Plus className="w-3 h-3 text-zinc-600 cursor-pointer hover:text-zinc-300" />}
    </div>
  );

  return (
    <div className="w-60 border-r border-white/5 bg-[#0a0a0a] flex flex-col h-screen fixed left-0 top-0 z-50">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">
            <Briefcase className="w-3 h-3 text-white" />
          </div>
          <span className="text-white text-sm font-semibold">{state.companyName}</span>
        </div>
        <Search className="w-4 h-4 text-zinc-600 cursor-pointer hover:text-zinc-300" />
      </div>

      <div className="flex-1 overflow-y-auto px-2 scrollbar-hide">
        {/* Work Section */}
        <SectionHeader label="Pekerjaan" />
        <div className="space-y-0.5">
          <NavItem icon={Inbox} label="Kotak Masuk" badge="1" />
          <NavItem icon={AlertCircle} label="Isu" />
          <NavItem icon={RotateCcw} label="Rutinitas" badge="Beta" />
          <NavItem icon={Target} label="Target" />
        </div>

        {/* Projects Section */}
        <SectionHeader label="Proyek" showPlus />
        <div className="space-y-0.5">
          <div className="flex items-center gap-3 px-3 py-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-[13px] font-medium text-zinc-500">Orientasi</span>
          </div>
        </div>

        {/* Agents Section */}
        <SectionHeader label="Agen AI" showPlus />
        <div className="space-y-0.5">
          {state.agents.map((agent: Agent) => (
            <NavItem 
              key={agent.id}
              icon={agent.id === 'ceo' ? UserCheck : Cpu} 
              label={agent.name}
              active={state.activeSection === 'agents' && state.activeAgentId === agent.id}
              onClick={() => {
                setActiveSection('agents');
                setActiveAgent(agent.id);
              }}
              badge={agent.liveCount > 0 ? `${agent.liveCount} aktif` : null}
              statusIcon={agent.liveCount > 0 ? <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> : null}
            />
          ))}
        </div>

        {/* Company Section */}
        <SectionHeader label="Perusahaan" />
        <div className="space-y-0.5 pb-8">
          <NavItem icon={Inbox} label="Antrean Pesanan" active={state.activeSection === 'orders'} onClick={() => setActiveSection('orders')} />
          <NavItem icon={Users} label="Organisasi" />
          <NavItem icon={Settings} label="Keahlian" />
          <NavItem icon={DollarSign} label="Hub Pendapatan" active={state.activeSection === 'revenue'} onClick={() => setActiveSection('revenue')} />
          <NavItem icon={ShieldCheck} label="Keamanan (Anti-Hack)" active={state.activeSection === 'security'} onClick={() => setActiveSection('security')} />
          <NavItem icon={Activity} label="Aktivitas" />
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 bg-[#0d0d0d]">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center text-xs font-bold text-zinc-400 group-hover:bg-zinc-700">
            P
          </div>
          <div className="flex-1">
            <p className="text-[12px] font-medium text-white">Pemilik</p>
            <p className="text-[10px] text-zinc-500">Kontrol Utama</p>
          </div>
          <Plus className="w-3 h-3 text-zinc-600" />
        </div>
      </div>
    </div>
  );
}
