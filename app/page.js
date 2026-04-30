"use client";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);

  const createQR = async () => {
    const res = await fetch("/api/create-qr", {
      method: "POST"
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>KessPay Demo</h1>

      <button onClick={createQR}>
        Create QR Payment
      </button>

      {result && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
