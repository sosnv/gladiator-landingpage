import { NextResponse } from "next/server";

const QR_DESTINATION = "/";

export function GET(request: Request) {
  return NextResponse.redirect(new URL(QR_DESTINATION, request.url), 307);
}
