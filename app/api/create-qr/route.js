export const runtime = "nodejs";

import crypto from "crypto";

function createSign(params, secret) {
  const string =
    `body=${params.body}&` +
    `currency=${params.currency}&` +
    `expires_in=${params.expires_in}&` +
    `login_type=${params.login_type}&` +
    `out_trade_no=${params.out_trade_no}&` +
    `seller_code=${params.seller_code}&` +
    `total_amount=${params.total_amount}` +
    secret;

  return crypto
    .createHash("md5")
    .update(string)
    .digest("hex")
    .toUpperCase();
}

export async function POST() {
  try {
    // TOKEN
    const tokenRes = await fetch(process.env.KESSPAY_BASE_URL + "/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "password",
        client_id: process.env.KESSPAY_CLIENT_ID,
        client_secret: process.env.KESSPAY_CLIENT_SECRET,
        username: process.env.KESSPAY_USERNAME,
        password: process.env.KESSPAY_PASSWORD
      })
    });

    const token = await tokenRes.json();

    if (!token.access_token) {
      return Response.json({
        success: false
      });
    }

    const order = {
      seller_code: "CU2510-101504183252854717",
      out_trade_no: Date.now().toString(),
      body: "Payment",
      total_amount: "10",
      currency: "USD",
      login_type: "ANONYMOUS",
      expires_in: "6000"
    };

    const sign = createSign(order, process.env.KESSPAY_CLIENT_SECRET);

    const payload = {
      ...order,
      sign,
      sign_type: "MD5",
      service: "webpay.acquire.createorder"
    };

    const res = await fetch(process.env.KESSPAY_BASE_URL + "/api/mch/v2/gateway", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    // ONLY RETURN CLEAN RESULT
    if (data && data.success) {
      return Response.json({
        success: true,
        qr_code: data.qr_code || null
      });
    }

    return Response.json({
      success: false
    });

  } catch (err) {
    return Response.json({
      success: false
    });
  }
}
