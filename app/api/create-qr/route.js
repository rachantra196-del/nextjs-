export const runtime = "nodejs";

export async function POST() {
  return Response.json({
    success: true,
    message: "API CONNECTED SUCCESSFULLY",
    time: new Date().toISOString()
  });
}
