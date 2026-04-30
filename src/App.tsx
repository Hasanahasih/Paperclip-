import React from 'react';
import Sidebar from './components/Sidebar';
import AgentPortal from './components/AgentPortal';
import MonetizationHub from './components/MonetizationHub';
import PublicPortal from './components/PublicPortal';
import SecurityDashboard from './components/SecurityDashboard';
import OrderQueue from './components/OrderQueue';
import { motion, AnimatePresence } from 'motion/react';
import { useGameEngine } from './services/gameEngine';

export default function App() {
  const game = useGameEngine();

  const renderContent = () => {
    // Check for public route
    if (window.location.pathname === '/order') {
       return <PublicPortal />;
    }

    switch (game.state.activeSection) {
      case 'agents':
        return <AgentPortal game={game} />;
      case 'revenue':
        return <MonetizationHub game={game} />;
      case 'security':
        return <SecurityDashboard />;
      case 'orders':
        return <OrderQueue />;
      default:
        return <AgentPortal game={game} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-zinc-400 font-sans selection:bg-white selection:text-black antialiased">
      {/* The background is controlled by the components themselves to match the dark aesthetic */}
      <Sidebar game={game} />
      
      <main className="flex-1 ml-60 h-screen overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${game.state.activeSection}-${game.state.activeAgentId}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        {/* System Overlays */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </main>

      {/* Global Terminal Grid Lines (Very Subtle) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-white/[0.02]" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-white/[0.02]" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-white/[0.02]" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-white/[0.02]" />
      </div>
    </div>
  );
}
