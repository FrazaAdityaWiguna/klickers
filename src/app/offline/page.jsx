"use client";

export default function OfflinePage() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>🔌 Kamu Sedang Offline</h1>
      <p>Silakan cek koneksi internet kamu.</p>
      <button onClick={() => window.location.reload()}>Coba Lagi</button>
    </div>
  );
}
