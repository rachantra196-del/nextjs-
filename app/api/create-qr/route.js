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

  const finalString = string + "&key=" + secret;

  // 🔥 THIS IS THE MOST IMPORTANT LINE
  console.log("🔴 KESSPAY SIGN STRING:", finalString);

  const sign = crypto
    .createHash("md5")
    .update(finalString)
    .digest("hex")
    .toUpperCase();

  return sign;
}
