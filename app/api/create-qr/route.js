import crypto from "crypto";

function createSign(params, secret) {
  const ignore = ["sign", "sign_type", "service"];

  const filtered = {};

  Object.keys(params).forEach(key => {
    if (!ignore.includes(key) && params[key] !== undefined && params[key] !== "") {
      filtered[key] = params[key];
    }
  });

  const string = Object.keys(filtered)
    .map(key => `${key}=${filtered[key]}`)
    .join("&");

  return crypto
    .createHash("md5")
    .update(string + secret)
    .digest("hex")
    .toUpperCase();
}

export async function POST() {
  try {
    // GET TOKEN
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

    // REQUEST BODY
    const body = {
      seller_code: "CU2510-101504183252854717",
      out_trade_no: Math.random().toString(36).substring(2, 10),
      body: "Testing Payment",
      total_amount: 10,
      currency: "USD",
      login_type: "ANONYMOUS",
      expires_in: 6000
    };

    // SIGN FIRST
    const sign = createSign(body, process.env.KESSPAY_CLIENT_SECRET);

    // ADD REQUIRED FIELDS
    body.sign = sign;
    body.sign_type = "MD5";
    body.service = "webpay.acquire.createorder";

    // CALL API
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
    return Response.json({ error: err.message }, { status: 500 });
  }
}
