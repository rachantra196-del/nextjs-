"use client";
import { useState } from "react";

export default function Home() {
  const [qr, setQr] = useState(null);
  const [loading, setLoading] = useState(false);

  const createQR = async () => {
    setLoading(true);

    const res = await fetch("/api/create-qr", {
      method: "POST"
    });

    const data = await res.json();
    setLoading(false);

    setQr(data);
  };

  // extract QR safely
  const qrCode =
    qr?.qr_code ||
    qr?.data?.qr_code ||
    qr?.qr?.qr_code;

  return (
    <div style={{ padding: 40 }}>
      <h1>KessPay Demo</h1>

      <button onClick={createQR} disabled={loading}>
        {loading ? "Loading..." : "Create QR Payment"}
      </button>

      {/* SHOW ERROR */}
      {qr?.success === false && (
        <pre style={{ color: "red" }}>
          {JSON.stringify(qr, null, 2)}
        </pre>
      )}

      {/* SHOW QR */}
      {qrCode && (
        <div style={{ marginTop: 20 }}>
          <h3>QR Code:</h3>
          <img
            src={qrCode}
            alt="QR"
            style={{ width: 200, height: 200 }}
          />
        </div>
      )}
    </div>
  );
}
