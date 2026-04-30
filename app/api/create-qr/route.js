
function randomId() {
  return Math.random().toString(36).substring(2, 10);
}

export async function POST() {
  // 1. Get token
  const tokenRes = await fetch("https://" + process.env.VERCEL_URL + "/api/token", {
    method: "POST"
  });

  const token = await tokenRes.json();

  // 2. Create QR order
  const res = await fetch(process.env.KESSPAY_BASE_URL + "/api/mch/v2/gateway", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.access_token
    },
    body: JSON.stringify({
      service: "webpay.acquire.createorder",
      sign_type: "MD5",
      seller_code: "CU2510-101504183252854717",
      out_trade_no: randomId(),
      body: "Testing Payment",
      total_amount: 10,
      currency: "USD",
      login_type: "ANONYMOUS",
      expires_in: 6000
    })
  });

  const data = await res.json();
  return Response.json(data);
}
