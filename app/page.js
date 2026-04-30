"use client";
import { useState } from "react";

export default function Home() {
  const [qr, setQr] = useState(null);
  const [loading, setLoading] = useState(false);

  const createQR = async () => {
    setLoading(true);
    setQr(null);

    try {
      const res = await fetch("/api/create-qr", {
        method: "POST"
      });

      const data = await res.json();

      if (data.success && data.qr_code) {
        setQr(data.qr_code);
      } else {
        setQr(null);
      }

    } catch (err) {
      setQr(null);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>KessPay Demo</h1>

      <button onClick={createQR} disabled={loading}>
        {loading ? "Loading..." : "Create QR Payment"}
      </button>

      {/* ONLY SHOW QR (NO ERRORS) */}
      {qr && (
        <div style={{ marginTop: 20 }}>
          <img src={qr} width={200} />
        </div>
      )}
    </div>
  );
}
