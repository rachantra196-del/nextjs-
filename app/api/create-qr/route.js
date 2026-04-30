export const runtime = "nodejs";

import crypto from "crypto";

const GATEWAY_URL = "https://devwebpayment.kesspay.io/api/mch/v2/gateway";

const CLIENT_SECRET = "iVK[rHVjUf-yrO-gl:WRdlv2N-)ZO!xrX!W9_=@t]6LZDx|95%dA,jI";
const SELLER_CODE = "CU2510-101504183252854717";

/* ================= SIGN (STRICT ORDER ONLY) ================= */
function sign(payload) {
  const raw =
    "body=" + payload.body +
    "&currency=" + payload.currency +
    "&login_type=" + payload.login_type +
    "&out_trade_no=" + payload.out_trade_no +
    "&seller_code=" + payload.seller_code +
    "&total_amount=" + payload.total_amount +
    "&key=" + CLIENT_SECRET;

  return crypto.createHash("md5").update(raw).digest("hex").toUpperCase();
}

export async function POST(req) {
  try {
    const input = await req.json();

    const out_trade_no = "ORDER_" + Date.now();

    const payload = {
      body: "KessPay Payment",
      currency: "USD",
      login_type: "ANONYMOUS",
      out_trade_no,
      seller_code: SELLER_CODE,
      total_amount: input.total_amount || 10
    };

    const finalPayload = {
      service: "webpay.acquire.createorder",
      sign_type: "MD5",
      ...payload,
      sign: sign(payload)
    };

    const res = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(finalPayload)
    });

    const data = await res.json();

    return Response.json({
      success: true,
      out_trade_no,
      kesspay: data
    });

  } catch (err) {
    return Response.json({
      success: false,
      error: err.message
    });
  }
}
