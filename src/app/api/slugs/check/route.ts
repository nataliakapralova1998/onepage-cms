import { NextRequest, NextResponse } from "next/server";

// Slugs that are always reserved
const RESERVED_SLUGS = [
  "admin",
  "app",
  "api",
  "login",
  "logout",
  "signup",
  "dashboard",
  "editor",
  "settings",
  "billing",
  "support",
  "help",
  "about",
  "terms",
  "privacy",
  "blog",
  "www",
];

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  if (!slug || slug.length < 2) {
    return NextResponse.json({ available: false, reason: "too_short" }, { status: 400 });
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ available: false, reason: "invalid_characters" }, { status: 400 });
  }

  if (RESERVED_SLUGS.includes(slug.toLowerCase())) {
    return NextResponse.json({ available: false, reason: "reserved" });
  }

  // TODO: check database for existing slugs
  // const existing = await db.query.pages.findFirst({ where: eq(pages.slug, slug) });
  // if (existing) return NextResponse.json({ available: false, reason: "taken" });

  return NextResponse.json({ available: true });
}