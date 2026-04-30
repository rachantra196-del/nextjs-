export const runtime = "nodejs";

export async function POST() {
  return Response.json({
    success: true,
    message: "API WORKING",
    qr: "demo-qr"
  });
}
