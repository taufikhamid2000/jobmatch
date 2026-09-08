import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Applications - JobMatch",
  description: "Application monitor, analytics, and reports",
};

const ANALYTICS = [
  { label: "Total applications", value: "312" },
  { label: "Avg. time to review", value: "1.8 days" },
  { label: "Strong matches (>80%)", value: "58" },
  { label: "Rejected", value: "127" },
] as const;

const APPLICATIONS = [
  { candidate: "A. Ramirez", role: "Senior Backend Engineer", match: 88, stage: "Interviewing" },
  { candidate: "J. Tan", role: "Product Designer", match: 74, stage: "Screened" },
  { candidate: "M. Osei", role: "Senior Backend Engineer", match: 69, stage: "Applied" },
  { candidate: "L. Nguyen", role: "Data Analyst", match: 91, stage: "Offer" },
  { candidate: "S. Kaur", role: "Customer Success Manager", match: 52, stage: "Applied" },
  { candidate: "R. Fischer", role: "Product Designer", match: 45, stage: "Rejected" },
] as const;

function matchState(match: number): { label: string; className: string } {
  if (match >= 80) return { label: "Strong", className: "text-accent" };
  if (match >= 60) return { label: "Moderate", className: "text-foreground/70" };
  return { label: "Weak", className: "text-destructive" };
}

export default async function ApplicationsPage() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data?.user || error) redirect("/auth/signin");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-12 animate-page-in">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Application monitor</h1>
        <p className="mt-1 text-sm text-foreground/60">Review incoming applications and how they score against requirements.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ANALYTICS.map((stat) => (
          <Card key={stat.label} className="rounded-2xl border-border bg-muted/40 shadow-none">
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground/60">Recent applications</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {APPLICATIONS.map((app) => {
            const state = matchState(app.match);
            return (
              <div
                key={`${app.candidate}-${app.role}`}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{app.candidate}</p>
                  <p className="text-xs text-foreground/50">{app.role}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-foreground/70">{app.stage}</span>
                  <span className={`w-24 text-right text-sm font-mono ${state.className}`}>
                    {app.match}% · {state.label}
                  </span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
