/** Accessible route loading state. */
export default function Loading() {
  return (
    <main
      id="main-content"
      aria-busy="true"
      className="min-h-screen grid place-items-center bg-[var(--bg)] p-6"
    >
      <p className="text-sm font-bold text-[var(--navy)]">Loading your celebration workspace…</p>
    </main>
  );
}
