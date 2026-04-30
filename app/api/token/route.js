export async function POST() {
  const res = await fetch(process.env.KESSPAY_BASE_URL + "/oauth/token", {
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

  const data = await res.json();
  return Response.json(data);
}
