import React from 'react';
import { motion } from 'motion/react';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jan', rev: 4500 },
  { month: 'Feb', rev: 8200 },
  { month: 'Mar', rev: 12500 },
  { month: 'Apr', rev: 18900 },
  { month: 'May', rev: 28400 },
  { month: 'Jun', rev: 42100 },
];

export default function MonetizationHub({ game }: { game: any }) {
  const { state } = game;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-32">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic leading-none mb-2">Hub Pendapatan</h1>
          <p className="text-zinc-600 font-mono text-[10px] tracking-widest uppercase italic">Kontrol Bisnis SaaS & Gerbang Pembayaran</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-2xl flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-emerald-500 font-black text-xs uppercase tracking-widest italic">Penagihan Langsung Aktif</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0b0b0c] border border-white/5 rounded-[48px] p-10 flex flex-col justify-between group">
           <div className="flex justify-between items-center mb-12">
              <div>
                 <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Pendapatan Kotor</h3>
                 <p className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase italic mt-1">Pendapatan Berulang Bulanan (MRR)</p>
              </div>
              <div className="text-right">
                 <p className="text-emerald-500 text-4xl font-black italic tracking-tighter leading-none">${state.funds.toLocaleString()}</p>
                 <p className="text-zinc-700 text-[10px] font-bold uppercase mt-1">Total Kumulatif</p>
              </div>
           </div>

           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="1 10" vertical={false} stroke="#ffffff05" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#333', fontSize: 10, fontWeight: '900' }} />
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#000', border: '1px solid #222', borderRadius: '4px' }}
                       itemStyle={{ fontSize: '10px', color: '#10b981', fontStyle: 'italic', textTransform: 'uppercase' }}
                    />
                    <Bar dataKey="rev" fill="#10b981" radius={[8, 8, 0, 0]} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white border border-white/10 rounded-[40px] p-10 text-black group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <CreditCard className="w-32 h-32" />
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none mb-6">Tarik Dana</h3>
              
              <div className="space-y-4 mb-8">
                 <div className="bg-zinc-100 p-4 rounded-2xl">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase italic">Sumber Bank</p>
                    <p className="font-black italic">BCA - **** 1290</p>
                 </div>
                 <div className="bg-zinc-100 p-4 rounded-2xl">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase italic">Saldo Saat Ini</p>
                    <p className="font-black italic text-emerald-600">${state.funds.toLocaleString()}</p>
                 </div>
              </div>
              
              <button 
                onClick={async () => {
                   const amount = prompt("Masukkan jumlah untuk ditarik ($):");
                   if (!amount) return;
                   
                   try {
                     const response = await fetch('/api/withdraw', {
                       method: 'POST',
                       headers: { 'Content-Type': 'application/json' },
                       body: JSON.stringify({
                         amount: parseFloat(amount),
                         userId: 'CEO-01',
                         bankInfo: { bankName: 'BCA', accountNumber: '782910293' }
                       })
                     });
                     const result = await response.json();
                     if (result.success) {
                       alert(`Berhasil! Kode Transaksi: ${result.transactionId}\n${result.message}`);
                     } else {
                       alert(result.message);
                     }
                   } catch (e) {
                     alert("Kesalahan Koneksi. Silakan coba lagi.");
                   }
                }}
                className="w-full bg-black text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-xs tracking-widest transition-all active:scale-95"
              >
                Eksekusi Penarikan <TrendingUp className="w-4 h-4" />
              </button>
              
              <div className="mt-6 flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-emerald-600" />
                 <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Sertifikasi PCI Tingkat 1 & Terverifikasi BCA</span>
              </div>
           </div>

           <div className="bg-[#0b0b0c] border border-white/5 rounded-[40px] p-8">
              <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-6">Pertumbuhan Langganan</h3>
              <div className="space-y-4">
                 {[
                   { plan: 'AI Perusahaan Rintisan', price: '$49/bln', count: 124, growth: '+12%' },
                   { plan: 'Nexus Perusahaan', price: '$499/bln', count: 18, growth: '+5%' },
                   { plan: 'Logika Kustom', price: 'Variabel', count: 4, growth: '+2%' },
                 ].map((tier, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-black rounded-2xl border border-white/5">
                       <div>
                          <p className="text-white font-black text-xs uppercase italic tracking-tighter">{tier.plan}</p>
                          <p className="text-zinc-600 font-mono text-[9px]">{tier.price}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-white font-black italic">{tier.count}</p>
                          <p className="text-emerald-500 text-[9px] font-bold">{tier.growth}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-[#0b0b0c] border border-white/5 rounded-[48px] p-12">
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-6 flex items-center gap-3">
               <Zap className="w-6 h-6 text-amber-500 fill-amber-500" /> Ekonomi Token
            </h3>
            <p className="text-zinc-500 text-sm leading-loose italic mb-8">
               Perusahaan Anda menghasilkan pendapatan melalui **Arbitrase Komputasi**. Anda membeli daya pemrosesan data dengan harga rendah dan menjual solusi AI kritis dengan harga tinggi. Saat ini, setiap solusi yang terpecahkan menambah aliran pendapatan berulang Anda.
            </p>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 bg-black rounded-3xl border border-white/5">
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1 italic">Biaya per Ops</p>
                  <p className="text-white font-black italic">$0.00042</p>
               </div>
               <div className="p-6 bg-black rounded-3xl border border-white/5">
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1 italic">Nilai per Solusi</p>
                  <p className="text-emerald-500 font-black italic">$840.00</p>
               </div>
            </div>
         </div>

         <div className="bg-gradient-to-tr from-zinc-900 to-black border border-white/10 rounded-[48px] p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">Peta Jalan Menuju Pendapatan $1M</h3>
            <ul className="space-y-4">
               {[
                 'Otomatisasi 100% Layanan Pelanggan melalui Node Logika',
                 'Skalakan Tenaga Kerja Saraf ke 500 utas paralel',
                 'Integrasikan Stripe Connect untuk fungsi pasar',
                 'Terapkan ke Jaringan Edge Global dengan uptime tinggi'
               ].map((step, i) => (
                 <li key={i} className="flex gap-4 items-start text-zinc-400 text-xs italic leading-relaxed">
                    <div className="w-5 h-5 rounded-full border border-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                       {i + 1}
                    </div>
                    {step}
                 </li>
               ))}
            </ul>
         </div>
      </div>
    </div>
  );
}
