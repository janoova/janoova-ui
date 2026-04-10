import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const draft = await draftMode();
  draft.disable();

  const { origin, searchParams } = new URL(request.url);
  const returnTo = searchParams.get("returnTo");

  // Validate returnTo is a relative path to prevent open redirect
  const safePath =
    returnTo && returnTo.startsWith("/") && !returnTo.startsWith("//")
      ? returnTo
      : "/";

  return NextResponse.redirect(new URL(safePath, origin));
}
