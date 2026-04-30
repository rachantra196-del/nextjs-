const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://nextjs-ten-gamma-79.vercel.app";

const res = await fetch(`${baseUrl}/api/create-qr`, {
  method: "POST"
});
