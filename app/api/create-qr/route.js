export const runtime = "nodejs";

export async function POST() {
  return Response.json({
    success: true,
    message: "Build test OK"
  });
}
