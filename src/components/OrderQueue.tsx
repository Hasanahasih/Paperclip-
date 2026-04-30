import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Package, CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';

export default function OrderQueue() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        setOrders(data);
      } catch (e) {
        console.error("Gagal mengambil pesanan");
      }
    };
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-12 max-w-6xl mx-auto space-y-10">
      <header className="flex justify-between items-end">
        <div>
           <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-2">Antrean Pesanan</h1>
           <p className="text-zinc-600 font-mono text-[10px] tracking-widest uppercase italic">Pesanan Masuk Dari Portal Publik</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 px-6 py-3 rounded-2xl flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-blue-500 font-black text-xs uppercase tracking-widest italic">{orders.length} Pesanan Menunggu</span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {orders.length === 0 ? (
          <div className="h-64 border border-zinc-900 rounded-[48px] flex flex-col items-center justify-center text-center space-y-4">
             <Package className="w-12 h-12 text-zinc-800" />
             <p className="text-zinc-600 font-medium italic text-[16px]">Belum ada pesanan dari klien.</p>
             <p className="text-zinc-800 text-[10px] uppercase tracking-widest font-bold">Menunggu trafik global...</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-[#0b0b0c] border border-white/5 p-8 rounded-[32px] flex items-center justify-between group hover:border-white/10 transition-all">
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center">
                     <TrendingUp className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                     <h3 className="text-white font-black italic uppercase tracking-tighter text-xl">{order.clientName}</h3>
                     <p className="text-zinc-500 text-sm italic max-w-md truncate">{order.task}</p>
                  </div>
               </div>
               <div className="text-right flex items-center gap-12">
                  <div>
                     <p className="border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black italic uppercase tracking-widest">
                        ${order.budget}
                     </p>
                     <p className="text-zinc-600 text-[10px] uppercase font-bold mt-1 tracking-widest italic">{new Date(order.timestamp).toLocaleDateString()}</p>
                  </div>
                  <button className="bg-white text-black px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all">
                     Proses Sekarang
                  </button>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
