"use client";

import { useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("");

  const createQR = async () => {
    try {
      const res = await fetch("/api/create-qr", {
        method: "POST"
      });

      const data = await res.json();
      console.log(data);

      setMsg(data.message || "done");
    } catch (e) {
      setMsg("network error");
      console.log(e);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>KessPay Demo</h1>
      <button onClick={createQR}>Create QR Payment</button>
      <p>{msg}</p>
    </div>
  );
}
