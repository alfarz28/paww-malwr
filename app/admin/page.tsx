import { supabase } from "@/lib/supabase";
import { LoginForm } from "./submit/client-forms";
import AdminDashboardClient from "./dashboard-client";
import { isAuthenticated } from "./submit/actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuth = await isAuthenticated();

  if (!isAuth) {
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
