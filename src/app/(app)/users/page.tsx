import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Users - JobMatch",
  description: "User scheduler, role assignment, and performance tracker",
};

const TEAM = [
  { name: "Priya Shah", role: "Hiring Manager", reviewsThisWeek: 24, avgResponseTime: "3h", nextSlot: "Today 2:00 PM" },
  { name: "Devon Clarke", role: "Recruiter", reviewsThisWeek: 41, avgResponseTime: "1h", nextSlot: "Today 4:30 PM" },
  { name: "Yuki Sato", role: "Interviewer", reviewsThisWeek: 12, avgResponseTime: "6h", nextSlot: "Tomorrow 10:00 AM" },
  { name: "Omar Haddad", role: "Admin", reviewsThisWeek: 3, avgResponseTime: "1d", nextSlot: "Unscheduled" },
] as const;

const ROLES = ["Admin", "Hiring Manager", "Recruiter", "Interviewer"] as const;

export default async function UsersPage() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data?.user || error) redirect("/auth/signin");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-12 animate-page-in">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Team &amp; scheduling</h1>
        <p className="mt-1 text-sm text-foreground/60">Assign roles, track interview slots, and monitor reviewer throughput.</p>
      </div>

      <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground/60">Team members</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-foreground/50">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Reviews this week</th>
                <th className="px-6 py-3 font-medium">Avg. response</th>
                <th className="px-6 py-3 font-medium">Next slot</th>
              </tr>
            </thead>
            <tbody>
              {TEAM.map((member) => (
                <tr key={member.name} className="border-b border-border last:border-0">
                  <td className="px-6 py-3 font-medium text-foreground">{member.name}</td>
                  <td className="px-6 py-3">
                    <select
                      defaultValue={member.role}
                      aria-label={`Role for ${member.name}`}
                      className="rounded-lg border border-border bg-background px-2 py-1 text-xs text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      {ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-3 font-mono text-foreground/80">{member.reviewsThisWeek}</td>
                  <td className="px-6 py-3 font-mono text-foreground/80">{member.avgResponseTime}</td>
                  <td className="px-6 py-3 text-foreground/60">{member.nextSlot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
