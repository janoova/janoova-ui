import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const draft = await draftMode();
  draft.disable();

  const url = new URL(request.nextUrl);

  return NextResponse.redirect(new URL("/", url.origin));
}
