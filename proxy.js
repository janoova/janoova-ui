import { NextResponse } from "next/server";

export function proxy(request) {
  const response = NextResponse.next();
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}
