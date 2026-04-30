import crypto from "crypto";

function createSign(params, secret) {
  const filtered = {
    seller_code: params.seller_code,
    out_trade_no: params.out_trade_no,
    body: params.body,
    total_amount: params.total_amount,
    currency: params.currency,
    login_type: params.login_type,
    expires_in: params.expires_in
  };

  const string = Object.keys(filtered)
    .map(k => `${k}=${filtered[k]}`)
    .join("&");

  const sign = crypto
    .createHash("md5")
    .update(string + "&key=" + secret)
    .digest("hex")
    .toUpperCase();

  return sign;
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

    // BODY
    const body = {
      seller_code: "CU2510-101504183252854717",
      out_trade_no: Math.random().toString(36).substring(2, 10),
      body: "Testing Payment",
      total_amount: 10,
      currency: "USD",
      login_type: "ANONYMOUS",
      expires_in: 6000
    };

    // SIGN
    body.sign = createSign(body, process.env.KESSPAY_CLIENT_SECRET);

    body.sign_type = "MD5";
    body.service = "webpay.acquire.createorder";

    // REQUEST
    const qrRes = await fetch(process.env.KESSPAY_BASE_URL + "/api/mch/v2/gateway", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token
      },
      body: JSON.stringify(body)
    });

    const data = await qrRes.json();

    // SAFE RESPONSE (NO RAW ERROR)
    if (!data || data.success === false) {
      return Response.json({
        success: false,
        message: "Unable to create payment"
      });
    }

    return Response.json(data);

  } catch (err) {
    return Response.json({
      success: false,
      message: "Service temporarily unavailable"
    });
  }
}
