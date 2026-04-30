export const runtime = "nodejs";

export async function POST() {
  try {
    // 🔴 TEMP SIMPLE RESPONSE (to make build WORK first)
    // We will add KessPay back AFTER build succeeds

    return Response.json({
      success: true,
      message: "API working",
      qr_code: null
    });

  } catch (err) {
    return Response.json({
      success: false,
      message: "Server error"
    });
  }
}
