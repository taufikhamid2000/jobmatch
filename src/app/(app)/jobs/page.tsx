import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Jobs - JobMatch",
  description: "Job posting tracker, alerts, and creation tools",
};

const JOBS = [
  { id: "JM-101", title: "Senior Backend Engineer", status: "Open", applicants: 41, matchRate: "78%", posted: "Sep 1" },
  { id: "JM-102", title: "Product Designer", status: "Open", applicants: 29, matchRate: "63%", posted: "Sep 3" },
  { id: "JM-103", title: "QA Lead", status: "Extraction pending", applicants: 0, matchRate: "—", posted: "Sep 7" },
  { id: "JM-104", title: "Data Analyst", status: "Closed", applicants: 22, matchRate: "81%", posted: "Aug 18" },
  { id: "JM-105", title: "Customer Success Manager", status: "Open", applicants: 15, matchRate: "55%", posted: "Sep 6" },
] as const;

const ALERTS = [
  "QA Lead listing has been in \"extraction pending\" for over 24 hours.",
  "Customer Success Manager has a below-average match rate (55%) — consider tightening requirements.",
] as const;

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Open"
      ? "bg-accent/15 text-accent"
      : status === "Closed"
      ? "bg-muted text-foreground/50"
      : "bg-amber-500/15 text-amber-600";
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles}`}>{status}</span>;
}

export default async function JobsPage() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data?.user || error) redirect("/auth/signin");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-12 animate-page-in">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Job posting tracker</h1>
          <p className="mt-1 text-sm text-foreground/60">Track listings, extraction status, and match quality.</p>
        </div>
        <Button variant="primary" className="rounded-full">
          + New listing
        </Button>
      </div>

      {ALERTS.length > 0 && (
        <div className="flex flex-col gap-2">
          {ALERTS.map((alert) => (
            <div
              key={alert}
              role="status"
              className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400"
            >
              {alert}
            </div>
          ))}
        </div>
      )}

      <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground/60">All listings</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-foreground/50">
                <th className="px-6 py-3 font-medium">Listing</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Applicants</th>
                <th className="px-6 py-3 font-medium">Match rate</th>
                <th className="px-6 py-3 font-medium">Posted</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {JOBS.map((job) => (
                <tr key={job.id} className="border-b border-border last:border-0">
                  <td className="px-6 py-3">
                    <div className="font-medium text-foreground">{job.title}</div>
                    <div className="text-xs text-foreground/40">{job.id}</div>
                  </td>
                  <td className="px-6 py-3">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="px-6 py-3 font-mono text-foreground/80">{job.applicants}</td>
                  <td className="px-6 py-3 font-mono text-foreground/80">{job.matchRate}</td>
                  <td className="px-6 py-3 text-foreground/60">{job.posted}</td>
                  <td className="px-6 py-3">
                    <a href="#" className="py-2 -my-2 text-xs text-foreground/70 underline underline-offset-4 hover:text-foreground">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
