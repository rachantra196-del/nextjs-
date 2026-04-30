export const runtime = "nodejs";

export async function POST() {
  return Response.json({
    success: true,
    qr_code: null,
    message: "API working"
  });
}
