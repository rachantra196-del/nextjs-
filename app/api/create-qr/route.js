import crypto from "crypto";

function createSign(params, secret) {
  delete params.sign;

  const sortedKeys = Object.keys(params).sort();

  const string = sortedKeys
    .map(key => `${key}=${params[key]}`)
    .join("&");

  return crypto.createHash("md5").update(string + secret).digest("hex");
}

export async function POST() {
  try {
    // STEP 1: TOKEN
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

    // STEP 2: BODY
    const body = {
      service: "webpay.acquire.createorder",
      sign_type: "MD5",
      seller_code: "CU2510-101504183252854717",
      out_trade_no: Math.random().toString(36).substring(2, 10),
      body: "Testing Payment",
      total_amount: 10,
      currency: "USD",
      login_type: "ANONYMOUS",
      expires_in: 6000
    };

    // STEP 3: SIGN
    body.sign = createSign({ ...body }, process.env.KESSPAY_CLIENT_SECRET);

    // STEP 4: CALL API
    const qrRes = await fetch(process.env.KESSPAY_BASE_URL + "/api/mch/v2/gateway", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token
      },
      body: JSON.stringify(body)
    });

    const data = await qrRes.json();

    return Response.json(data);

  } catch (err) {
    return Response.json({
      error: err.message
    }, { status: 500 });
  }
}
