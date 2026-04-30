export async function POST() {
  try {
    // STEP 1: Get token
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

    const tokenText = await tokenRes.text();

    if (!tokenRes.ok) {
      return Response.json({
        error: "TOKEN_FAILED",
        details: tokenText
      }, { status: 500 });
    }

    const token = JSON.parse(tokenText);

    // STEP 2: Create order
    const qrRes = await fetch(process.env.KESSPAY_BASE_URL + "/api/mch/v2/gateway", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token
      },
      body: JSON.stringify({
        service: "webpay.acquire.createorder",
        sign_type: "MD5",
        seller_code: "CU2510-101504183252854717",
        out_trade_no: Math.random().toString(36).substring(2, 10),
        body: "Testing Payment",
        total_amount: 10,
        currency: "USD",
        login_type: "ANONYMOUS",
        expires_in: 6000
      })
    });

    const qrText = await qrRes.text();

    return Response.json({
      token,
      qr: qrText
    });

  } catch (err) {
    return Response.json({
      error: "SERVER_ERROR",
      message: err.message
    }, { status: 500 });
  }
}
