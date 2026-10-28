# Problem statement and alignment

## Source status

The original external problem statement was not present in this repository. This document is an explicit, reviewable inference from the implemented routes, UI labels, schemas, utilities, and tests. A product owner should validate this scope before treating it as the authoritative brief.

## Inferred challenge

Event hosts and planners need one place to turn celebration details into an actionable plan: a bounded intake, budget allocation, vendor and task context, guest logistics, seating, and a day-of run sheet. The system should remain useful when an external AI service is unavailable and should reject unsafe or invalid input at the trust boundary.

## Implemented alignment

| Need | Evidence in the repository |
| --- | --- |
| Collect event requirements | `src/app/onboarding/page.tsx` and `PlanGenerationRequestSchema` |
| Produce a structured plan | `src/app/api/ai/generate-plan/route.ts` and `src/lib/ai/provider.ts` |
| Keep calculations deterministic | `src/lib/utils/budget.ts`, `currency.ts`, and `timeline.ts` |
| Manage guest and seating constraints | `src/app/guests/page.tsx`, `src/app/seating/page.tsx`, and `src/lib/utils/seating.ts` |
| Protect the public planning endpoint | `src/lib/utils/security.ts` and the route handler |
| Support operation without Gemini | deterministic fallback in `src/lib/ai/provider.ts` |

## Explicit gaps

- Authentication, authorization, durable persistence, payments, and real vendor dispatch are not implemented.
- The UI contains demonstration listings and simulated actions; they are not external service integrations.
- The current automated component coverage is smoke-level and does not prove every route's browser behavior.

These gaps are intentionally documented so product claims remain aligned with what the repository can demonstrate.
