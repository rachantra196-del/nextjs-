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

      if (!data.success) {
        setQr({ error: data.message || "Payment failed" });
      } else {
        setQr(data);
      }

    } catch (err) {
      setQr({ error: "Network error" });
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>KessPay Demo</h1>

      <button onClick={createQR} disabled={loading}>
        {loading ? "Loading..." : "Create QR Payment"}
      </button>

      {/* ERROR */}
      {qr?.error && (
        <p style={{ color: "red" }}>
          {qr.error}
        </p>
      )}

      {/* QR IMAGE */}
      {qr?.qr_code && (
        <div style={{ marginTop: 20 }}>
          <img src={qr.qr_code} width={200} />
        </div>
      )}
    </div>
  );
}
