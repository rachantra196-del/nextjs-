const res = await fetch("/api/create-qr", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    total_amount: 10
  })
});
