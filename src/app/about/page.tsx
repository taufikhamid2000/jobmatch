import { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";

export const metadata: Metadata = {
  title: "About - JobMatch",
  description:
    "JobMatch is the planned AI layer over job-listing platforms: employers paste a listing, the model extracts the real requirements, and matches candidates honestly.",
};

const MISSING = [
  "Listing ingestion (paste/import a real job posting)",
  "Requirement extraction — the actual AI layer the name refers to",
  "Candidate matching/scoring logic",
  "Persisted jobs/applications/users data (currently mock arrays per page)",
  "Notifications and alerts beyond static UI",
] as const;

// Public, reachable without auth — the only route besides /auth/* that
// doesn't check for a session, per the request to keep this pitch page open.
export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-16 animate-page-in">
      <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <LogoMark size={24} />
        JobMatch
      </Link>

      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold text-foreground">The pitch</h1>
        <p className="text-lg leading-relaxed text-foreground/80">
          JobMatch is the planned AI layer over job-listing platforms: employers paste a listing, the
          model extracts the real requirements, and matches candidates honestly.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-muted/40 p-6">
        <h2 className="text-sm font-medium text-foreground/60">What&apos;s missing: the AI layer</h2>
        <p className="mt-2 text-sm text-foreground/70">
          This build is a UI prototype only. The dashboard shell, auth, and design system are real;
          the job-matching domain logic below is not implemented yet.
        </p>
        <ul className="mt-4 flex flex-col gap-2">
          {MISSING.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/70">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-3">
        <Link
          href="/auth/signin"
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Sign in
        </Link>
        <Link
          href="/auth/signup"
          className="rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Sign up
        </Link>
      </div>

      <p className="text-xs text-foreground/40">
        A project by{" "}
        <a
          href="https://taufik.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 hover:underline"
        >
          Muhammad Taufik →
        </a>
      </p>
    </div>
  );
}
