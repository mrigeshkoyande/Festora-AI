# Festora AI Security Notes

## Runtime protections

- Every API body is bounded before parsing and validated with Zod.
- Responses use CSP with `frame-ancestors`, HSTS, `X-Content-Type-Options`, Referrer-Policy,
  Permissions-Policy, and `X-Frame-Options`.
- Gemini credentials remain server-side. Responses are generic and raw error objects are not logged.
- The default rate limiter is in-memory for local development. In-memory state does not coordinate
  across serverless instances or multiple containers. Production deployments should set both
  `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to use the shared REST adapter.

## Reporting

Do not include credentials, API keys, guest personal data, or private vendor data in an issue.
Describe the affected route, reproduction steps, and an appropriately redacted request/response.
