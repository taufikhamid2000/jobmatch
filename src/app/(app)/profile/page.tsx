import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Profile - JobMatch",
  description: "Your account details",
};

export default async function ProfilePage() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data?.user || error) redirect("/auth/signin");

  const user = data.user;
  // Supabase anonymous users carry an empty-string email, not null —
  // "|| guest" only, no nullish coalescing needed but harmless either way.
  const email = user.email || "guest";

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-12 animate-page-in">
      <h1 className="text-xl font-semibold text-foreground">Profile</h1>

      <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground/60">Account</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between border-b border-border pb-3">
            <span className="text-foreground/60">Email</span>
            <span className="font-mono text-foreground">{email}</span>
          </div>
          <div className="flex justify-between border-b border-border pb-3">
            <span className="text-foreground/60">User ID</span>
            <span className="font-mono text-xs text-foreground/70">{user.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground/60">Joined</span>
            <span className="text-foreground">
              {user.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground/60">Employer details</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-foreground/60">
          Company profile, billing, and notification preferences aren&apos;t wired up yet — this is a UI
          prototype. See the README&apos;s &quot;What&apos;s missing&quot; section.
        </CardContent>
      </Card>
    </div>
  );
}
