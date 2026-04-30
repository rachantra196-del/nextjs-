export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();

    return Response.json({
      success: true,
      message: "QR created successfully (demo)",
      data: {
        out_trade_no: "TEST_" + Date.now(),
        amount: body.total_amount || 10,
        currency: "USD",
        qr_code: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=KessPay-SUCCESS-DEMO"
      }
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
}
