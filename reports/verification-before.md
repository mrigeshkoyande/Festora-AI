# Festora AI — Verification Before

Date: 2026-10-28  
Scope: read-only repository audit against the supplied QA/security/accessibility checklist.

> This is a self-estimate, not the official evaluator score.

## Audit method and scope

- Repository audited: `Festora-AI`.
- Source files were not modified. The only requested artifact created by this phase is this report.
- Score method: `PASS / total checklist items × 100`. `FAIL` and `NOT RUN` both contribute zero, but `NOT RUN` is kept distinct so unverified claims are not presented as failures.
- The supplied official scores are recorded for comparison only; they are not used to inflate the self-estimate.
- Evidence below is from commands and source inspection performed against the current tree on 2026-10-28.

## Verification commands

| Command/check | Exit/result | Evidence |
|---|---:|---|
| `npm install` | 0 | `up to date, audited 412 packages`; npm reported 3 vulnerabilities. A transient lockfile change during install was restored; tracked source was clean before this report was created. |
| `npm run typecheck` | 0 | `tsc --noEmit` completed without diagnostics. |
| `npm run lint` | 0 | `next lint`; `No ESLint warnings or errors`. Next.js reported that `next lint` is deprecated in Next 16. |
| `npm test` | 0 | 31 tests, 8 suites, 31 passed, 0 failed, 0 skipped. |
| Coverage run | 0, direct runner | The package script does not accept the coverage flag: `npm test -- --experimental-test-coverage` treated the flag as a file and exited 1. The direct Node test run completed with 31/31 passing and produced coverage. |
| `npm run build` | 0 | Next.js 15.5.28 compiled, typechecked, and generated static pages `25/25`. Shared first-load JS: 103 kB; route first-load JS: approximately 157–180 kB. |
| `npm run check-contrast` | 0 | Contrast scanner reported all listed ratios passing and palette compliance passing. |
| `npm audit` | 1 | 3 vulnerabilities total, including 2 high. The detailed report identified `postcss` and `zod`; the available remediation requires `npm audit fix --force` and a breaking Next/Zod update. |
| Runtime header check | HTTP 200 | `npm start` served `/`. Observed HSTS, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, Referrer-Policy, and Permissions-Policy. No CSP header was present. `next start` also warned that standalone output should use `node .next/standalone/server.js`. |
| Docker build | NOT RUN | Docker was not available in the environment. |
| Graph extraction | NOT RUN | The graph tool found 71 code, 28 docs, 0 papers, and 27 images, then stopped because no LLM API key was available. This does not count as repository verification. |

## Score summary

| Category | Self-estimate | Official score | Delta | Top 3 failing items |
|---|---:|---:|---:|---|
| Code quality | 16.67% (2/12) | 86% | -69.33 | `any`/weak typing; files over 300 lines; missing env validation/error/loading boundaries |
| Security | 20% (2/10) | 95% | -75 | missing CSP; incorrect/in-memory rate-limit design; npm audit vulnerabilities |
| Efficiency | 50% (3/6) | 100% | -50 | no dynamic imports for heavy UI; request-path performance not measured; client-component usage not audited |
| Testing | 12.5% (1/8) | 94% | -81.5 | no enforced coverage threshold; no API/component/a11y tests; CI omits lint/tests |
| Accessibility | 20% (3/15) | 98% | -78 | missing dialog focus management; missing live/status announcements and icon labels; seating/moving-content keyboard controls |
| Problem statement alignment | 0% (0/5) | 93% | -93 | exact problem statement unavailable; no demo/seed flow; in-memory limitation and README link claims |
| Overall, unweighted category mean | 19.86% | 93.13% | -73.27 | See the checklist evidence below; this is not the evaluator's weighting model. |

## Code quality checklist

| ID | Status | Evidence |
|---|---|---|
| CQ-01 No `any` | FAIL | `src/app/ai-assistant/page.tsx:38,294`, `src/app/settings/page.tsx:135,253,372`, and test casts use `any`. |
| CQ-02 No `@ts-ignore`/`@ts-expect-error` | PASS | Repository search found no occurrences. |
| CQ-03 No `eslint-disable` | FAIL | `src/components/ui/Opening3DAnimation.tsx:57` contains `eslint-disable-next-line react-hooks/exhaustive-deps`. |
| CQ-04 No `console.log` in `src/` | PASS | Repository search found no `console.log` under `src/`. Runtime `console.warn`/`console.error` remain and are covered under security logging. |
| CQ-05 No file over 300 lines | FAIL | Examples: `src/app/page.tsx` 948 lines, `src/app/vendors/page.tsx` 743, `src/lib/ai/provider.ts` 729, `src/app/guests/page.tsx` 694. |
| CQ-06 No duplicated logic | FAIL | `cn` is implemented in both `src/lib/utils.ts` and `src/components/layout/WorkspaceShell.tsx`; broader duplication was not mechanically proven. |
| CQ-07 Types inferred from Zod | FAIL | Request schemas exist in `src/lib/utils/validation.ts`, but `PlanGenerationInput` is separately handwritten in `src/lib/ai/provider.ts:13-24`, and inference is not used consistently. |
| CQ-08 Environment variables validated with Zod | FAIL | `.env.example` exists, but no Zod environment schema/parse boundary was found. |
| CQ-09 `error.tsx`, `loading.tsx`, and `not-found.tsx` | FAIL | `src/app/not-found.tsx` exists; no `src/app/error.tsx`, `loading.tsx`, or `global-error.tsx` was found. |
| CQ-10 TSDoc on public utilities | FAIL | Utility documentation is incomplete; for example `src/lib/utils.ts:4` and public database interfaces lack TSDoc. |
| CQ-11 No unused exports/imports | NOT RUN | ESLint passed and provides evidence for unused imports/variables, but no export-usage analysis was run. |
| CQ-12 Prettier configured and passing | FAIL | No Prettier package/config was found and no format check exists in `package.json`. |

## Security checklist

| ID | Status | Evidence |
|---|---|---|
| SEC-01 Security headers on real responses | FAIL | Real `/` response had HSTS, XFO, nosniff, Referrer-Policy, and Permissions-Policy, but no CSP or `frame-ancestors`. |
| SEC-02 Every API route validates input with Zod | PASS | The only API route, `src/app/api/ai/generate-plan/route.ts`, validates the POST body with the Zod schema in `src/lib/utils/validation.ts`; no query/param route was found. |
| SEC-03 Generic errors without stack traces | PASS | The route returns generic invalid-JSON/validation/generation messages and does not return raw stack traces. |
| SEC-04 Request body size limit | FAIL | `req.json()` is called without a body-size guard in `generate-plan/route.ts:27-35`. |
| SEC-05 Rate limiter is correct and multi-instance safe | FAIL | `src/lib/utils/security.ts` uses an in-memory `Map`; the route passes `60` as the interval, which is milliseconds rather than a documented minute window. No shared-store adapter or multi-instance documentation exists. |
| SEC-06 Input sanitized for DOM/AI and prompt injection guarded | FAIL | Only selected string fields are trimmed/sanitized in the route; no prompt-injection boundary or robust output/content policy was found. User-controlled values are interpolated into the AI prompt in `provider.ts:101-113`. |
| SEC-07 No secrets in client bundle or logs; env handling | FAIL | `GEMINI_API_KEY` is server-side, but provider and route log raw error objects (`console.warn`/`console.error`), and env variables have no schema validation. |
| SEC-08 `npm audit` has no high/critical vulnerabilities | FAIL | `npm audit` exited 1 with 3 vulnerabilities, including 2 high; `postcss` and `zod` were identified. |
| SEC-09 Docker non-root and healthcheck | FAIL | Dockerfile uses non-root `nextjs`, but has no `HEALTHCHECK`. Compose checks `GET /api/ai/generate-plan` while that route exports POST only, so the configured healthcheck is not a verified healthy endpoint. Docker runtime was unavailable. |
| SEC-10 `SECURITY.md` exists | FAIL | No root `SECURITY.md` was found. |

Additional security risk: `provider.ts:116` hardcodes `gemini-1.5-flash` rather than reading a model configuration. The current official Gemini model catalog should be checked before relying on that model identifier: <https://ai.google.dev/gemini-api/docs/models>.

## Efficiency checklist

| ID | Status | Evidence |
|---|---|---|
| EFF-01 Heavy components use dynamic imports | FAIL | No `dynamic()` import was found. `Opening3DAnimation` and `HeroPriceDeck` are statically imported by `src/app/page.tsx`; `recharts` is declared but no import was found. |
| EFF-02 No unnecessary client components | NOT RUN | No client/server component size or hydration audit was run. |
| EFF-03 Bundle size recorded | PASS | Build recorded 103 kB shared first-load JS and approximately 157–180 kB per route. |
| EFF-04 No blocking request path | NOT RUN | No latency or request-path benchmark was run. The generation route awaits AI generation and database writes; this is not a performance measurement. |
| EFF-05 AI request timeout | PASS | `AbortSignal.timeout(8000)` is used in `src/lib/ai/provider.ts:120`. |
| EFF-06 Images optimized | PASS | Image usage was inspected and uses Next image handling; no failing raw-image pattern was found in the audited UI. |

## Testing checklist

| ID | Status | Evidence |
|---|---|---|
| TST-01 All tests pass | PASS | `npm test`: 31/31 passing across 8 suites, 0 failures. Files include currency, budget, timeline, seating, security, validation, AI provider, and integration-flow tests. |
| TST-02 Coverage at least 90% lines and branches with enforced threshold | FAIL | Direct coverage run reported 90.01% lines but only 86.47% branches; no coverage threshold/configuration is enforced. The package-script coverage invocation itself exited 1. |
| TST-03 Edge cases for NaN/zero/negative/huge values | FAIL | Tests cover some negative/schema cases, but no complete NaN, zero, and huge-value matrix exists for core utilities. |
| TST-04 API route tests | FAIL | No test imports or exercises `src/app/api/ai/generate-plan/route.ts`. |
| TST-05 Gemini failure/timeout fallback tests | FAIL | The provider test covers deterministic no-key fallback only; no mocked fetch failure or timeout test was found. |
| TST-06 Component tests for onboarding/budget/seating | FAIL | No component/UI test framework or tests for those screens were found. |
| TST-07 Automated axe/accessibility tests | FAIL | No axe dependency or automated accessibility test was found. |
| TST-08 CI runs typecheck, lint, tests, and build | FAIL | `.github/workflows/deploy.yml` runs install, contrast, TypeScript, and build, but omits `npm test` and `npm run lint`. |

## Accessibility checklist

| ID | Status | Evidence |
|---|---|---|
| A11Y-01 Skip link | PASS | `src/app/layout.tsx:77-83` contains a skip link targeting the workspace main region. |
| A11Y-02 One `<main>` landmark per page | FAIL | Workspace/home pages provide main landmarks, but onboarding and several public pages do not consistently provide one identifiable main landmark. |
| A11Y-03 Heading hierarchy | NOT RUN | No automated heading audit/Lighthouse/axe run was available. |
| A11Y-04 Visible focus states | FAIL | Focus classes exist on many controls, but the audit found icon controls with weak/inconsistent focus affordances; this was not proven globally. |
| A11Y-05 Focus trap and return for dialogs/drawers | FAIL | `src/components/ui/Dialog.tsx` and `Drawer.tsx` handle Escape/body scroll but do not implement focus trapping or focus restoration. |
| A11Y-06 Escape closes overlays | PASS | Dialog/drawer and command-palette Escape handlers were found. |
| A11Y-07 Reduced motion | PASS | `globals.css:133-155` includes a reduced-motion media rule and `Opening3DAnimation` checks `prefers-reduced-motion`. |
| A11Y-08 Pause/stop moving content | FAIL | `Marquee.tsx` uses an infinite animation without a pause control; homepage video/intro motion is not universally pauseable. |
| A11Y-09 `aria-live` for dynamic status/toasts | FAIL | No `aria-live` occurrence was found; dynamic status/toast/AI typing regions are not announced. |
| A11Y-10 Icon-only controls have accessible names | FAIL | Examples include mobile close/menu/notification controls in `WorkspaceShell`, the Navbar hamburger, and AI mic controls without consistent accessible labels. |
| A11Y-11 Chart data has a text alternative | FAIL | No chart text/table alternative was found; dashboard data visualizations are primarily visual/CSS bars. |
| A11Y-12 Seating has a keyboard alternative | FAIL | Seating table interactions use click handlers without equivalent keyboard interaction in `src/app/seating/page.tsx:232`. |
| A11Y-13 Status is not conveyed by color alone | FAIL | Some dashboard/status indicators use color plus a title or visual treatment without a reliable visible text/state alternative. |
| A11Y-14 Touch targets are at least 44×44 px | FAIL | Examples include `p-1.5`, `p-1`, and small button variants in Navbar, command palette, and AI controls. |
| A11Y-15 axe reports zero violations | NOT RUN | No axe/Lighthouse audit was run. |

## Problem statement alignment checklist

| ID | Status | Evidence |
|---|---|---|
| ALIGN-01 Exact problem statement mapped to a feature | NOT RUN | The supplied request does not contain a concrete problem statement to map; an honest score cannot be assigned. |
| ALIGN-02 Wedding, birthday, and community event flows work end-to-end | FAIL | Provider branches recognize wedding/birthday/community, and integration tests cover those labels, but onboarding presents Wedding/Corporate/Social and no complete UI-to-API end-to-end coverage was found. |
| ALIGN-03 Demo/seed flow and useful empty states | FAIL | No `Try demo`/seed flow was found. The database is in-memory; a few empty states exist, but the requested demo/seed verification is not satisfied. |
| ALIGN-04 In-memory limitation disclosed | FAIL | `src/lib/db.ts` explicitly uses pure in-memory storage, but the user-facing product does not clearly disclose reset/non-persistence behavior. |
| ALIGN-05 README links are relative and accurate | FAIL | README traceability links use `file:///c:/...` paths. README also references a LICENSE that is not present. |

## README truth check

| README claim | Verification | Status |
|---|---|---|
| `25 Tests / 7 Suites` | Actual run: 31 tests / 8 suites. | FAIL — stale. |
| Gemini 1.5 Flash | Provider hardcodes `gemini-1.5-flash`; current model support was not established from the repository and should be confirmed against the official catalog. | UNSURE — do not present as verified. |
| 12 categories / 6 cities / 60+ vendors | Current vendors page contains eight vendor records and four named cities plus “All”; the claimed counts are not supported by the current code. | FAIL. |
| 100% uptime | No uptime measurement or operational guarantee was found; storage is in-memory. | FAIL. |
| 15+ modules / 32 capabilities | Route/module and command-palette inventory does not substantiate the README count; command palette currently lists 11 items. | UNSURE/FAIL — requires reconciliation. |
| Docker image under 120 MB | No Docker build was possible and no image-size evidence exists. | NOT RUN. |
| Latency around 800 ms–1.2 s / under 50 ms UI interactions | No benchmark command or measurement was found. | NOT RUN. |
| 25 pre-rendered static routes | Build generated static pages `25/25`, so this claim is consistent with the build output, although the route inventory should remain documented. | PASS for build evidence. |
| LICENSE and traceability artifacts | README references LICENSE and local traceability paths; root LICENSE is absent and `file:///` links are not portable. | FAIL. |

## Prioritized fix list

Ordered by expected score gain per implementation effort, subject to validating the exact product requirements before implementation:

1. Add CSP with `frame-ancestors`, correct the rate-limit interval/store, remove raw error logging, add request-size limits, and resolve the two high npm audit findings. This improves the largest security gaps with relatively contained changes.
2. Add a real coverage command with enforced line/branch thresholds, then add API-route tests, provider failure/timeout tests, and edge-case tests. Update CI to run lint and tests.
3. Fix accessibility foundations: dialog focus trap/return, accessible names, `aria-live` regions, keyboard seating interactions, pause controls, visible status text, and touch target sizes; then run axe/Lighthouse.
4. Reconcile README claims with measured behavior, replace `file:///` links, add the missing security/architecture disclosures, document in-memory reset behavior, and provide a deterministic demo/seed flow if required.
5. Improve code structure: remove `any`, split oversized pages/provider files, centralize `cn`, infer request types from Zod, add environment validation, and add error/loading boundaries plus formatting checks.
6. Improve efficiency after measurement: dynamically import heavy visual components, verify client-component boundaries, add a valid Docker health endpoint/check, and benchmark the generation path and bundle impact.

## Stop condition

Phase 1 verification is complete. No source implementation changes were made. Per the supplied process, this report is the handoff point; implementation should not begin until approval is given.
