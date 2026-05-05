import {  NextResponse } from "next/server";
import type {NextRequest} from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEMPS_API_URL}/api/analytics/${process.env.NEXT_PUBLIC_PROJECT_SLUG}/events`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TEMPS_API_KEY}`,
      },
      body: JSON.stringify(body),
    },
  );
  if (!response.ok)
    return NextResponse.json({ error: "Failed" }, { status: response.status });
  return NextResponse.json({ success: true });
}
