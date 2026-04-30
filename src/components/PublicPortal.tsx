import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Send, ShieldCheck, Globe, CreditCard } from 'lucide-react';

export default function PublicPortal() {
  const [order, setOrder] = useState({ clientName: '', task: '', budget: 50 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      alert("Gagal mengirim pesanan.");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
           <ShieldCheck className="w-10 h-10 text-emerald-500" />
        </div>
        <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">Pesanan Diterima</h1>
        <p className="text-zinc-500 max-w-md mx-auto leading-relaxed">
          Tenaga kerja AI kami sedang menganalisis permintaan Anda. Kami akan memberikan hasil terbaik dalam waktu singkat.
        </p>
        <button onClick={() => setSubmitted(false)} className="mt-8 text-emerald-500 font-bold uppercase text-xs tracking-widest hover:underline">
          Kirim Pesanan Lain
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans p-6 selection:bg-emerald-500 selection:text-black">
      <nav className="max-w-6xl mx-auto flex justify-between items-center py-8">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
              <Globe className="w-4 h-4 text-black" />
           </div>
           <span className="text-white font-black uppercase tracking-tighter italic">Paperclip AI Agency</span>
        </div>
        <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
           <span>Layanan</span>
           <span>Keamanan</span>
           <span className="text-emerald-500">BCA Verified</span>
        </div>
      </nav>

      <main className="max-w-xl mx-auto mt-20">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase leading-none mb-4">Selesaikan Pekerjaan Anda Secara Otonom</h1>
          <p className="text-zinc-500 italic">Pesan tugas AI profesional untuk bisnis Anda sekarang.</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-zinc-900/50 border border-white/5 p-10 rounded-[48px] space-y-8">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-2 block">Nama Anda / Perusahaan</label>
            <input 
              required
              className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white placeholder:text-zinc-800 focus:border-emerald-500/50 transition-all outline-none"
              placeholder="PT. Teknologi Maju"
              value={order.clientName}
              onChange={e => setOrder({...order, clientName: e.target.value})}
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-2 block">Tugas Yang Diinginkan</label>
            <textarea 
              required
              rows={4}
              className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white placeholder:text-zinc-800 focus:border-emerald-500/50 transition-all outline-none resize-none"
              placeholder="Contoh: Buatkan strategi pemasaran digital untuk produk kopi baru..."
              value={order.task}
              onChange={e => setOrder({...order, task: e.target.value})}
            />
          </div>

          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-2 block">Anggaran ($)</label>
              <input 
                type="number"
                className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none"
                value={order.budget}
                onChange={e => setOrder({...order, budget: parseInt(e.target.value)})}
              />
            </div>
            <div className="flex-shrink-0 mt-6">
               <CreditCard className="w-8 h-8 text-zinc-800" />
            </div>
          </div>

          <button className="w-full bg-emerald-500 text-black py-5 rounded-[24px] font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/20">
            Submit Order <Send className="w-4 h-4" />
          </button>
        </form>

        <footer className="mt-20 flex justify-center items-center gap-8 opacity-20 hover:opacity-100 transition-opacity">
           <ShieldCheck className="w-10 h-10" />
           <p className="text-[10px] font-bold uppercase tracking-widest">Enkripsi AES-256 Terenkripsi • BCA Secure • PCI Compliant</p>
        </footer>
      </main>
    </div>
  );
}
