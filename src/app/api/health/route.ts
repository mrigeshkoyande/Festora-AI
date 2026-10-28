import { NextResponse } from "next/server";
import { getSafeServerConfig } from "@/lib/utils/security";

/** Lightweight health endpoint for Docker/orchestrator probes. */
export function GET() {
  const config = getSafeServerConfig();
  return NextResponse.json({
    status: "ok",
    service: "festora-ai",
    rateLimitStore: config.usesSharedRateLimitStore ? "shared" : "in-memory",
  });
}
