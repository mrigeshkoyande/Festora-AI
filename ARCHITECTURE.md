# Festora AI Architecture

## Request flow

The onboarding form sends a bounded JSON request to `POST /api/ai/generate-plan`. The route validates
the request with Zod, sanitizes user-provided text, applies the configured rate-limit store, and
delegates plan generation to `src/lib/ai/provider.ts`.

The provider uses the configured Gemini model when `GEMINI_API_KEY` is available and falls back to
the deterministic planning engine when it is unavailable or fails validation. `GEMINI_MODEL` is
configurable; the current default is `gemini-3.8-flash`.

## Persistence boundary

The current `src/lib/db.ts` adapter is intentionally in-memory. It is suitable for demos and local
development but is not durable and does not share state across serverless instances or containers.
The UI and documentation must not describe this adapter as production persistence.

## Deployment

The Docker image uses a non-root runtime user and exposes `GET /api/health` for orchestrator health
checks. Production deployments should configure a durable database and shared rate-limit store before
promising cross-instance persistence or availability guarantees.
