"use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [qr, setQr] = useState(null);
  const [message, setMessage] = useState("");

  const createQR = async () => {
    setLoading(true);
    setQr(null);
    setMessage("");

    try {
      const res = await fetch("/api/create-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          total_amount: 10
        })
      });

      const data = await res.json();

      if (data.success) {
        setQr(data.data.qr_code);
        setMessage("Payment QR generated successfully");
      } else {
        setMessage("Failed to create QR");
      }
    } catch (err) {
      setMessage("Network error");
    }

    setLoading(false);
  };

  return (
    <main style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>KessPay Demo</h1>

      <button onClick={createQR} disabled={loading}>
        {loading ? "Creating..." : "Create QR Payment"}
      </button>

      <p>{message}</p>

      {qr && (
        <div style={{ marginTop: 20 }}>
          <img src={qr} alt="QR Code" />
        </div>
      )}
    </main>
  );
}
