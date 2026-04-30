
export const runtime = "nodejs";

import crypto from "crypto";

const GATEWAY_URL = "https://devwebpayment.kesspay.io/api/mch/v2/gateway";

const CLIENT_SECRET = "iVK[rHVjUf-yrO-gl:WRdlv2N-)ZO!xrX!W9_=@t]6LZDx|95%dA,jI";

function createSign(data) {
  const str =
    `out_trade_no=${data.out_trade_no}` +
    `&service=webpay.acquire.queryOrder` +
    `&key=${CLIENT_SECRET}`;

  return crypto.createHash("md5").update(str).digest("hex").toUpperCase();
}

export async function POST(req) {
  try {
    const { out_trade_no } = await req.json();

    const payload = {
      service: "webpay.acquire.queryOrder",
      sign_type: "MD5",
      out_trade_no
    };

    payload.sign = createSign(payload);

    const res = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    return Response.json({
      success: true,
      data
    });

  } catch (err) {
    return Response.json({
      success: false,
      error: err.message
    });
  }
}
