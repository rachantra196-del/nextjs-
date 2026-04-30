const res = await fetch("/api/create-qr", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
});

const data = await res.json();
console.log("API RESPONSE:", data);
