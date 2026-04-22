import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { LoginForm } from "./submit/client-forms";
import AdminDashboardClient from "./dashboard-client";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_auth")?.value === "true";

  if (!isAuthenticated) {
    return (
      <div className="pt-16 pb-16 relative z-10 w-full max-w-5xl mx-auto">
        <LoginForm />
      </div>
    );
  }

  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, comp, date, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="pt-16 pb-16 relative z-10 w-full max-w-5xl mx-auto">
      <AdminDashboardClient posts={posts || []} />
    </div>
  );
}
