import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Support - JobMatch",
  description: "FAQ and help content",
};

const FAQS = [
  {
    q: "How does requirement extraction work?",
    a: "You paste a job listing and the model pulls out the actual requirements — skills, experience level, must-haves vs. nice-to-haves — instead of relying on keyword matching. This layer isn't live yet in this build; see the README.",
  },
  {
    q: "What does the match percentage mean?",
    a: "It's meant to reflect how closely a candidate's application lines up with the extracted requirements, weighted toward must-haves. Currently shown as mock data throughout the dashboard.",
  },
  {
    q: "Can I invite teammates?",
    a: "Role assignment (Admin, Hiring Manager, Recruiter, Interviewer) is sketched out on the Users page. Real invitations and permission enforcement aren't implemented yet.",
  },
  {
    q: "Is my data shared with candidates?",
    a: "No — listings and applications stay scoped to your organization. Candidate-facing surfaces are out of scope for this prototype.",
  },
  {
    q: "Where do I report a bug?",
    a: "This is a personal portfolio project, not a supported product. Reach out via the link in the footer if something looks broken.",
  },
] as const;

export default async function SupportPage() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data?.user || error) redirect("/auth/signin");

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-12 animate-page-in">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Support</h1>
        <p className="mt-1 text-sm text-foreground/60">Answers to common questions about JobMatch.</p>
      </div>

      <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground/60">Frequently asked questions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group border-b border-border py-3 last:border-0">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-foreground">
                {faq.q}
                <span className="text-foreground/40 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm text-foreground/60">{faq.a}</p>
            </details>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
