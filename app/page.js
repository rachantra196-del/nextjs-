"use client";

import { useState } from "react";

export default function Home() {
  const [qr, setQr] = useState(null);
  const [status, setStatus] = useState("");

  const createQR = async () => {
    const res = await fetch("/api/create-qr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total_amount: 10 })
    });

    const data = await res.json();

    console.log(data);

    setQr(data.kesspay);
  };

  const checkStatus = async (orderId) => {
    const res = await fetch("/api/query-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ out_trade_no: orderId })
    });

    const data = await res.json();
    setStatus(JSON.stringify(data));
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>KessPay Demo</h1>

      <button onClick={createQR}>Create QR</button>

      {qr && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(qr, null, 2)}
        </pre>
      )}

      <button
        onClick={() => checkStatus(qr?.out_trade_no)}
        style={{ marginTop: 20 }}
      >
        Check Status
      </button>

      <p>{status}</p>
    </div>
  );
}
