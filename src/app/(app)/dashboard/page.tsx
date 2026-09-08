import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard - JobMatch",
  description: "Employer overview and job stats",
};

const STATS = [
  { label: "Open listings", value: "12", trend: "+2 this week" },
  { label: "New applicants", value: "184", trend: "+37 this week" },
  { label: "Interviews scheduled", value: "9", trend: "3 today" },
  { label: "Avg. requirement match", value: "71%", trend: "up from 64%" },
] as const;

const RECENT_ACTIVITY = [
  { id: 1, text: "Senior Backend Engineer received 14 new applications", time: "2h ago" },
  { id: 2, text: "Product Designer listing extraction finished — 6 requirements found", time: "5h ago" },
  { id: 3, text: "3 candidates auto-flagged as strong matches for QA Lead", time: "1d ago" },
  { id: 4, text: "Data Analyst listing closed — 22 applicants archived", time: "2d ago" },
] as const;

export default async function DashboardPage() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data?.user || error) {
    redirect("/auth/signin");
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-12 animate-page-in">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Employer overview</h1>
        <p className="mt-1 text-sm text-foreground/60">
          A snapshot of your open listings and how they&apos;re matching candidates.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.label} className="rounded-2xl border-border bg-muted/40 shadow-none">
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-xs text-foreground/50">{stat.trend}</CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl border-border bg-muted/40 shadow-none lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground/60">Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {RECENT_ACTIVITY.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                <p className="text-sm text-foreground">{item.text}</p>
                <span className="shrink-0 text-xs text-foreground/50">{item.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground/60">Pipeline health</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {[
              { stage: "Applied", count: 184, pct: 100 },
              { stage: "Screened", count: 96, pct: 52 },
              { stage: "Interviewing", count: 22, pct: 12 },
              { stage: "Offer", count: 4, pct: 2 },
            ].map((row) => (
              <div key={row.stage} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground/70">{row.stage}</span>
                  <span className="text-foreground/50">{row.count}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
