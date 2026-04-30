"use client";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);

  const createQR = async () => {
    const res = await fetch("/api/create-qr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total_amount: 10 })
    });

    const data = await res.json();
    setResult(data);
  };

  const checkStatus = async () => {
    const res = await fetch("/api/query-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        out_trade_no: result?.out_trade_no
      })
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>KessPay Demo</h1>

      <button onClick={createQR}>Create QR</button>

      <pre>{JSON.stringify(result, null, 2)}</pre>

      <button onClick={checkStatus}>Check Status</button>
    </div>
  );
}
