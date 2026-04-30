import React from 'react';
import { Shield, Lock, Eye, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export default function SecurityDashboard() {
  return (
    <div className="p-12 max-w-5xl mx-auto space-y-12">
      <header>
        <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-2">Pusat Keamanan</h1>
        <p className="text-zinc-600 font-mono text-[10px] tracking-widest uppercase italic">Proteksi Server-Side & Enkripsi AES-256</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#0b0b0c] border border-emerald-500/20 p-10 rounded-[48px] space-y-6">
           <div className="flex items-center gap-4 text-emerald-500">
              <ShieldCheck className="w-8 h-8" />
              <h3 className="text-xl font-black uppercase italic italic tracking-tighter">Status Sistem: AMAN</h3>
           </div>
           <p className="text-zinc-500 text-sm leading-relaxed italic">
             Semua transaksi ke BCA telah dienkripsi menggunakan protokol **BCA-Security-v2**. Kunci API Anda tidak pernah diekspos ke publik atau browser pengguna.
           </p>
           <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-black p-4 rounded-2xl border border-white/5">
                 <p className="text-[9px] text-zinc-600 uppercase font-bold mb-1">Firewall</p>
                 <p className="text-emerald-500 font-black italic">AKTIF</p>
              </div>
              <div className="bg-black p-4 rounded-2xl border border-white/5">
                 <p className="text-[9px] text-zinc-600 uppercase font-bold mb-1">Ancaman</p>
                 <p className="text-white font-black italic">0 TERDETEKSI</p>
              </div>
           </div>
        </div>

        <div className="bg-zinc-900/30 border border-white/5 p-10 rounded-[48px] flex flex-col justify-center">
           <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-4">Log Keamanan</h3>
           <div className="space-y-3 font-mono text-[10px]">
              <p className="text-zinc-600 italic">[08:00:21] Server otonom melakukan rotasi kunci enkripsi...</p>
              <p className="text-zinc-600 italic">[08:15:44] Upaya login dari IP luar ditolak (WAF Blocked)</p>
              <p className="text-emerald-500 italic">[08:42:10] Sinkronisasi kunci BCA Berhasil.</p>
           </div>
        </div>
      </div>

      <div className="bg-black border border-white/5 p-8 rounded-3xl flex items-center gap-8">
         <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-zinc-500" />
         </div>
         <div className="flex-1">
            <h4 className="text-white font-black uppercase italic tracking-tighter">Perlindungan Anti-Retas</h4>
            <p className="text-zinc-500 text-xs italic mt-1">Kami menggunakan sistem isolasi kernel untuk memastikan agen AI Anda tidak bisa dimanipulasi oleh pihak ketiga.</p>
         </div>
         <button className="px-6 py-2 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-full">Auditing API</button>
      </div>
    </div>
  );
}
