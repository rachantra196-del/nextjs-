const createQR = async () => {
  const res = await fetch("/api/create-qr", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ total_amount: 10 })
  });

  const data = await res.json();

  console.log("CREATE QR:", data);

  return data.out_trade_no;
};

const checkStatus = async (orderId) => {
  const res = await fetch("/api/query-status", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      out_trade_no: orderId
    })
  });

  const data = await res.json();

  console.log("STATUS:", data);
};
