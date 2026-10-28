# Festora AI improvement log

Date: 2026-10-28

This log records implemented changes and measured verification results. It does not claim that unverified product behavior is complete.

## Commits

- `a083597` — `fix(code-quality): enforce lint formatting and safe boundaries`
- `7ba0670` — `fix(testing): enforce coverage and expand boundary tests`
- `76a7755` — `fix(security): harden headers rate limits and AI boundaries`
- `88db927` — `fix(problem-alignment): reconcile product scope and add demo flow`
- `603ac5c` — `fix(accessibility): add landmarks focus controls and motion alternatives`
- `d14fae0` — `fix(code-quality): standardize remaining source formatting`
- `e9331e3` — `fix(efficiency): split heavy landing-page client bundles`
- `6bb5407` — `fix(problem-alignment): correct documented verification counts`

## Files changed and reason

- `.env.example`, `src/lib/env.ts` — documented and validated server configuration, including the configurable Gemini model and optional shared limiter.
- `next.config.ts` — added CSP, HSTS, nosniff, Referrer-Policy, Permissions-Policy, and frame-ancestor protection.
- `src/lib/utils/security.ts`, `src/app/api/ai/generate-plan/route.ts` — added bounded payloads, sanitization, correct fixed-window timing, and pluggable in-memory/Upstash rate limiting.
- `src/lib/ai/provider.ts` — uses `GEMINI_MODEL`, bounds untrusted prompt context, and falls back without logging raw errors.
- `src/app/api/health/route.ts`, `Dockerfile`, `docker-compose.yml` — added an actual health endpoint and wired container health checks.
- `SECURITY.md` — documented headers, secrets, generic errors, and the cross-instance limitation of process-local rate limiting.
- `ARCHITECTURE.md`, `docs/PROBLEM_STATEMENT.md` — documented request flow, persistence boundaries, and the inferred product scope.
- `README.md`, `LICENSE` — removed unsupported product claims, fixed portable links, documented prototype limitations, and reconciled test counts.
- `.github/workflows/deploy.yml` — added lint and test execution to CI.
- `package.json`, `package-lock.json` — added formatter, axe/jsdom test dependencies, coverage command, and remediated audited dependency vulnerabilities.
- `eslint.config.mjs`, `tsconfig.json`, `.prettierrc.json`, `.prettierignore` — moved to the supported ESLint configuration, enabled consistent formatting, and preserved repository instruction files.
- `src/app/error.tsx`, `src/app/loading.tsx` — added route error and loading boundaries.
- `src/lib/db.ts` — added public API documentation and stated process-local persistence behavior.
- `src/components/ui/CommandPalette.tsx`, `src/components/ui/Opening3DAnimation.tsx`, `src/app/ai-assistant/page.tsx` — removed purity/lint violations and replaced unstable message IDs.
- `src/components/ui/Dialog.tsx` — added focus trapping, Escape handling, scroll locking, and focus restoration for dialogs and drawers.
- `src/components/ui/Button.tsx`, `src/components/layout/Navbar.tsx`, `src/components/layout/WorkspaceShell.tsx` — improved touch targets and accessible names for common controls.
- `src/components/ui/Marquee.tsx`, `src/app/globals.css` — added a motion pause control and retained reduced-motion behavior.
- `src/app/seating/page.tsx`, `src/app/onboarding/page.tsx` — added keyboard activation for selectable cards and seating tables, plus an explicit demo plan flow.
- `src/app/about/page.tsx`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/contact/page.tsx`, `src/app/features/page.tsx`, `src/app/pricing/page.tsx`, `src/app/login/page.tsx`, `src/app/celebration/[slug]/page.tsx`, `src/app/not-found.tsx` — added main landmarks and skip-link targets.
- `src/app/dashboard/page.tsx`, `src/app/guests/page.tsx`, `src/app/ideas/page.tsx`, `src/app/settings/page.tsx` — added text alternatives and live status announcements for dynamic UI.
- `src/app/layout.tsx`, `src/components/layout/Footer.tsx`, `src/app/page.tsx` — softened unverifiable marketing metadata and split heavy landing-page client components with dynamic imports.
- `src/components/ui/Badge.tsx`, `src/components/ui/Card.tsx`, `src/components/ui/GlassSurface.tsx`, `src/components/ui/HeroPriceDeck.tsx`, `src/components/ui/Input.tsx`, `src/components/ui/LiquidGlassFilter.tsx`, `src/components/ui/StatBlock.tsx`, `src/components/ui/Tabs.tsx`, `src/components/layout/Footer.tsx` — applied the repository formatter consistently.
- `src/app/budget/page.tsx`, `src/app/privacy/page.tsx`, `src/app/run-sheet/page.tsx`, `src/app/settings/page.tsx`, `src/app/terms/page.tsx`, `src/app/timeline/page.tsx`, `src/app/vendors/page.tsx` — applied consistent formatting and retained accessible route structure.
- `src/lib/utils/budget.ts`, `src/lib/utils/currency.ts`, `src/lib/utils/seating.ts`, `src/lib/utils/timeline.ts`, `scripts/check-contrast.mjs` — applied formatting without changing the validated utility behavior.
- `tests/api-route.test.ts`, `tests/edge-cases.test.ts`, `tests/ai-provider.test.ts`, `tests/efficiency.test.ts` — added API, numeric boundary, Gemini failure, and generation-path timing coverage.
- `tests/component-render.test.tsx`, `tests/axe.test.ts`, `tests/focus-trap.test.tsx` — added component smoke, axe, and focus behavior tests.
- `tests/budget.test.ts`, `tests/currency.test.ts`, `tests/integration-flow.test.ts`, `tests/seating.test.ts`, `tests/security.test.ts`, `tests/timeline.test.ts`, `tests/validation.test.ts` — expanded existing edge, integration, security, and schema assertions.
- `scripts/test-with-coverage.mjs` — added an enforced measured coverage gate and real report parsing.
- `reports/verification-before.md` — preserved the source-of-truth audit used for this improvement pass.

## Commands and real result excerpts

```text
npm run format:check
All matched files use Prettier code style!

npm run typecheck
tsc --noEmit (exit 0)

npm run lint
eslint . --max-warnings=0 (exit 0)

npm test
# tests 58
# suites 14
# pass 58
# fail 0
# skipped 0

npm run test:coverage
# all files | 73.84 | 83.48 | 75.51 |
Coverage threshold passed for 7 utility files and the global report.

npm run build
Next.js 16.4.3
Generating static pages using 19 workers (25/25)
Routes included /api/ai/generate-plan and /api/health.

npm run check-contrast
All contrast checks PASSED & Palette compliance verified!

npm audit
found 0 vulnerabilities

Generation efficiency smoke
17.51 ms for 5 deterministic requests in the final verification run.
```

Production header proof from `curl -I http://localhost:3000/`:

```text
HTTP/1.1 200 OK
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: ... frame-ancestors 'self'; ...
```

The health response was:

```json
{"status":"ok","service":"festora-ai","rateLimitStore":"in-memory"}
```

The Gemini default was checked against [Google's Gemini 3.8 Flash model documentation](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash), which lists `gemini-3.8-flash` as the stable model code. The value remains configurable through `GEMINI_MODEL`.

## Unfixed or not fully proven

- The strict audit target of at least 90 lines and branches is not reached by the current measured report. The enforced gate is lower and explicit: global lines 70, branches 80, functions 70; utility lines 70 and branches 75. Raising it requires additional coverage, especially for UI routes and defensive branches.
- The large-file checklist remains open: `src/app/page.tsx`, `src/app/vendors/page.tsx`, `src/lib/ai/provider.ts`, and `src/app/guests/page.tsx` remain over 300 lines. Splitting these safely requires a broader component/module extraction pass.
- A dedicated exported-symbol reachability tool was not added; ESLint and TypeScript cover unused imports, variables, and type errors, but not every unused public export.
- Docker image build/size verification was not run because Docker was unavailable in the audit environment. The Docker healthcheck is configured but not runtime-proven here.
- Axe tests cover the shared dialog and marquee primitives, not every browser-rendered route. A full browser axe/Lighthouse pass and visual focus audit remain unverified.
- The timing smoke test exercises the deterministic local API path. It is not a production load, network latency, or multi-instance benchmark.
- Authentication, authorization, durable persistence, payments, and real vendor dispatch remain outside the implementation. The UI and documentation now identify these as prototype gaps.

## UNSURE

- The exact external problem statement was not supplied in the repository. `docs/PROBLEM_STATEMENT.md` records an explicit inference from the implemented routes and tests and asks the product owner to validate it.
- The demo vendor listings, ratings, testimonials, and marketing statistics are not independently verifiable. They are treated as demonstration content, not operational guarantees.
