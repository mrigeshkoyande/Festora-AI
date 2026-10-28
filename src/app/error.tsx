"use client";

import { Button } from "@/components/ui/Button";

/** Global route error boundary with a safe recovery action. */
export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content" className="min-h-screen grid place-items-center bg-[var(--bg)] p-6">
      <section role="alert" className="max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        <h1 className="text-2xl font-extrabold text-[var(--navy)]">Something went wrong</h1>
        <p className="mt-3 text-sm text-[var(--ink)]/70">
          Festora could not load this view. Your saved planning data was not changed.
        </p>
        <Button className="mt-6" variant="orange" onClick={() => reset()}>
          Try again
        </Button>
      </section>
    </main>
  );
}
