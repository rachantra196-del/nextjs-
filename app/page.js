const createQR = async () => {
  setLoading(true);
  setQr(null);

  try {
    const res = await fetch("/api/create-qr", {
      method: "POST", // 🔥 REQUIRED
      headers: {
        "Content-Type": "application/json"
      }
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
