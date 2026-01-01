export const runtime = "nodejs";

export function GET(): Response {
  return Response.json(
    {
      ok: true,
      service: "currency-calculator",
      ts: new Date().toISOString(),
    },
    { status: 200 },
  );
}
