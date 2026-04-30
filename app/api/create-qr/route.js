export const runtime = "nodejs";

import crypto from "crypto";

/* =======================
   CONFIG (DO NOT MOVE TO FRONTEND)
======================= */
const TOKEN_URL = "https://devwebpayment.kesspay.io/oauth/token";
const GATEWAY_URL = "https://devwebpayment.kesspay.io/api/mch/v2/gateway";

const CLIENT_ID = "5973bd5c-f4bf-4714-ac6c-15007f732534";
const CLIENT_SECRET = "iVK[rHVjUf-yrO-gl:WRdlv2N-)ZO!xrX!W9_=@t]6LZDx|95%dA,jI";

const USERNAME = "keovannak@hfcommercialbank.com";
const PASSWORD = "D9C<dGNrSj%>-2R!3vM(0uk?uJ$){VMv}=wla_=1B3=IyQwMY*QSgpa";

const SELLER_CODE = "CU2510-101504183252854717";

/* =======================
   GET TOKEN
======================= */
async function getToken() {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      grant_type: "password",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      username: USERNAME,
      password: PASSWORD
    })
  });

  return res.json();
}

/* =======================
   CREATE SIGN (IMPORTANT)
======================= */
function createSign(params) {
  // ⚠️ MUST MATCH API REQUIREMENT ORDER
  const string =
    `body=${params.body}` +
    `&currency=${params.currency}` +
    `&login_type=${params.login_type}` +
    `&out_trade_no=${params.out_trade_no}` +
    `&seller_code=${params.seller_code}` +
    `&total_amount=${params.total_amount}` +
    `&key=${CLIENT_SECRET}`;

  return crypto.createHash("md5").update(string).digest("hex").toUpperCase();
}

/* =======================
   MAIN API
======================= */
export async function POST(req) {
  try {
    const body = await req.json();

    const tokenData = await getToken();
    const accessToken = tokenData?.access_token;

    const out_trade_no = "ORDER_" + Date.now();

    const payload = {
      service: "webpay.acquire.createorder",
      sign_type: "MD5",
      seller_code: SELLER_CODE,
      out_trade_no,
      body: "Testing Payment",
      total_amount: body.total_amount || 10,
      currency: "USD",
      login_type: "ANONYMOUS",
      expires_in: 6000
    };

    // SIGN
    payload.sign = createSign(payload);

    const res = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    return Response.json({
      success: true,
      out_trade_no,
      kesspay_response: data
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    });
  }
}
