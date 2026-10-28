# Festora AI

Festora AI is a Next.js event-planning workspace for turning celebration intake into a structured planning blueprint. It includes deterministic budget, currency, timeline, seating, validation, and fallback-generation utilities, plus workspace screens for budgets, guests, vendors, timelines, and run sheets.

This repository is a working application prototype. It is not a hosted service and does not claim production authentication, durable persistence, payment processing, verified vendor guarantees, or uptime/latency SLAs.

## What is implemented

- Event intake with runtime validation at the API boundary.
- Optional Gemini generation with a deterministic fallback when the key is absent or the request fails.
- Integer-safe INR budget and currency calculations.
- Timeline dependency shifting and seating capacity checks.
- Workspace UI for budgets, guests, vendors, seating, ideas, settings, and the day-of run sheet.
- Security headers, bounded API payloads, input sanitization, and a pluggable rate-limit store.
- Keyboard-accessible seating selection, modal focus trapping, reduced-motion handling, and an accessible motion pause control.

## Known product boundaries

- The login and sign-up screens are demonstration UI only. They do not authenticate or persist accounts.
- Application data is currently held in client state and/or process memory. It is lost on restart and is not shared between serverless instances or multiple containers.
- The default rate limiter is process-local. Configure both Upstash variables for a shared limiter in multi-instance deployments.
- Vendor listings, prices, ratings, testimonials, and planning examples are demo content and should not be treated as independently verified claims.
- The original external problem statement was not included in this repository; the product scope documented here is inferred from the implemented routes and tests.

## Getting started

Requirements: Node.js 20 or newer and npm.

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The application runs without a Gemini key by using the deterministic fallback. To enable Gemini, set `GEMINI_API_KEY` in `.env.local`. `GEMINI_MODEL` defaults to [`gemini-3.8-flash`](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash), which is the stable model code listed in Google's current Gemini API documentation; it remains configurable for future model changes.

Never commit `.env.local` or any API key. See [SECURITY.md](SECURITY.md) for deployment guidance.

## Verification commands

```bash
npm run typecheck
npm run lint
npm test
npm run test:coverage
npm run build
npm run check-contrast
npm audit
```

The repository currently has 58 automated tests in 14 suites. `test:coverage` enforces thresholds for the utility layer and prints the measured Node coverage report; coverage is not a claim that every UI route is end-to-end tested.

## Configuration

Copy [.env.example](.env.example) and configure only what you need:

| Variable                   | Purpose                                              |
| -------------------------- | ---------------------------------------------------- |
| `GEMINI_API_KEY`           | Optional server-only Gemini credential.              |
| `GEMINI_MODEL`             | Configurable Gemini model name.                      |
| `NEXT_PUBLIC_APP_URL`      | Public application URL used by server configuration. |
| `UPSTASH_REDIS_REST_URL`   | Optional shared rate-limit store endpoint.           |
| `UPSTASH_REDIS_REST_TOKEN` | Optional server-only Upstash credential.             |

If the two Upstash variables are omitted, the in-memory limiter is used. That mode does not coordinate requests across serverless instances or multiple containers.

## Deployment

`Dockerfile` and `docker-compose.yml` provide a standalone deployment path. The application health endpoint is `GET /api/health`. Run a container build and deployment only in an environment with Docker available; the repository does not claim that a Docker build was performed in every development environment.

For architecture and data-flow details, see [ARCHITECTURE.md](ARCHITECTURE.md). For security controls and operational limitations, see [SECURITY.md](SECURITY.md). The inferred product scope is recorded in [docs/PROBLEM_STATEMENT.md](docs/PROBLEM_STATEMENT.md).

## Project layout

```text
src/app/                 Next.js routes, pages, and API handlers
src/components/          Shared UI and layout primitives
src/lib/                 AI provider, validation, persistence, and utilities
tests/                   Node test-runner, API, component, and axe tests
scripts/                 Verification scripts, including contrast and coverage
reports/                 Audit and improvement records
```

## License

The project is distributed under the [MIT License](LICENSE).
