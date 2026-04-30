import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // DATABASE MOCK (In real app, move to Firestore/Postgres)
  let balance = 250000.00;
  let publicOrders: any[] = [];

  // API: Penarikan ke BCA (Tervalidasi di Server)
  app.post("/api/withdraw", (req, res) => {
    const { amount, userId } = req.body;
    
    // Validasi Keamanan: Hanya CEO yang bisa tarik
    if (userId !== 'CEO-01') return res.status(403).json({ success: false, message: "Akses Ditolak: Hanya Pemilik yang bisa menarik dana." });
    
    if (amount > balance) return res.status(400).json({ success: false, message: "Saldo tidak mencukupi." });

    balance -= amount;
    console.log(`[BCA GATEWAY] Penarikan Berhasil: $${amount} ke Rekening Terdaftar.`);

    res.json({ 
      success: true, 
      transactionId: `BCA-${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
      newBalance: balance,
      message: "Dana sedang diproses ke rekening BCA Anda secara otomatis."
    });
  });

  // API: Menerima Pesanan dari Klien (Publik)
  app.post("/api/order", (req, res) => {
    const { clientName, task, budget } = req.body;
    
    if (!task || !budget) return res.status(400).json({ success: false, message: "Data pesanan tidak lengkap." });

    const newOrder = {
      id: Math.random().toString(36).substring(2, 9),
      clientName,
      task,
      budget,
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    publicOrders.push(newOrder);
    console.log(`[ORDER RECEIVED] Klien ${clientName} memesan: ${task} ($${budget})`);
    
    res.json({ success: true, orderId: newOrder.id, message: "Pesanan Anda telah diterima oleh tenaga kerja AI kami." });
  });

  app.get("/api/orders", (req, res) => res.json(publicOrders));

  // Simulasi Agen Mencari Klien Secara Otomatis
  setInterval(() => {
    const randomClients = ["Global Corp", "Startup Ninja", "BCA Private", "E-Com Indo", "Tech Solutions"];
    const randomTasks = [
      "Optimasi sistem database perbankan",
      "Analisis sentimen pasar untuk kampanye Q4",
      "Penyusunan laporan keamanan siber mingguan",
      "Audit kode otomatis untuk aplikasi mobile",
      "Riset kompetitor industri AI"
    ];
    
    if (publicOrders.length < 15) {
      const newOrder = {
        id: Math.random().toString(36).substring(2, 9),
        clientName: randomClients[Math.floor(Math.random() * randomClients.length)],
        task: randomTasks[Math.floor(Math.random() * randomTasks.length)],
        budget: Math.floor(Math.random() * 500) + 100,
        status: 'pending',
        timestamp: new Date().toISOString()
      };
      publicOrders.push(newOrder);
      console.log(`[AI AGENT] Menemukan Klien Baru: ${newOrder.clientName}`);
    }
  }, 30000); // Cari klien setiap 30 detik

  // Vite setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Paperclip Enterprise Server running on http://localhost:${PORT}`);
  });
}

startServer();
