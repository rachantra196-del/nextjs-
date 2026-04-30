export const runtime = "nodejs";

import crypto from "crypto";

function createSign(params, secret) {
  const ordered = [
    `seller_code=${params.seller_code}`,
    `out_trade_no=${params.out_trade_no}`,
    `body=${params.body}`,
    `total_amount=${params.total_amount}`,
    `currency=${params.currency}`,
    `login_type=${params.login_type}`,
    `expires_in=${params.expires_in}`
  ].join("&");

  const stringToSign = ordered + secret;

  console.log("SIGN STRING:", stringToSign);

  return crypto
    .createHash("md5")
    .update(stringToSign)
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
        success: false,
        message: "Token failed",
        debug: token
      });
    }

    // ORDER
    const body = {
      seller_code: "CU2510-101504183252854717",
      out_trade_no: Date.now().toString(),
      body: "Testing Payment",
      total_amount: 10,
      currency: "USD",
      login_type: "ANONYMOUS",
      expires_in: 6000
    };

    // SIGN
    const sign = createSign(body, process.env.KESSPAY_CLIENT_SECRET);

    const payload = {
      ...body,
      sign,
      sign_type: "MD5",
      service: "webpay.acquire.createorder"
    };

    console.log("FINAL PAYLOAD:", payload);

    const qrRes = await fetch(process.env.KESSPAY_BASE_URL + "/api/mch/v2/gateway", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token
      },
      body: JSON.stringify(payload)
    });

    const data = await qrRes.json();

    // RETURN FULL DEBUG (IMPORTANT)
    return Response.json({
      success: data.success || false,
      response: data,
      sent: payload
    });

  } catch (err) {
    return Response.json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
}
