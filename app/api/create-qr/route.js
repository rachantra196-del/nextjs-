function createSign(params, secret) {
  // ⚠️ EXACT RAW KEY ORDER (DO NOT CHANGE)
  const arr = [
    "body",
    "currency",
    "expires_in",
    "login_type",
    "out_trade_no",
    "seller_code",
    "total_amount"
  ];

  const string = arr.map(k => `${k}=${params[k]}`).join("&");

  const final = string + secret;

  // 🔥 THIS IS CRITICAL
  console.log("RAW SIGN STRING =>", final);

  return require("crypto")
    .createHash("md5")
    .update(final)
    .digest("hex")
    .toUpperCase();
}
