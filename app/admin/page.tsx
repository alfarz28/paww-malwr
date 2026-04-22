import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { LoginForm } from "./submit/client-forms";
import AdminDashboardClient from "./dashboard-client";
import { isAuthenticated } from "./submit/actions";
import LoadingState from "@/components/loading";

export const dynamic = "force-dynamic";

async function AdminContent() {
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, comp, date, created_at")
    .order("created_at", { ascending: false });

  return <AdminDashboardClient posts={posts || []} />;
}

export default async function AdminPage() {
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    return (
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-12 pb-16 pt-4 relative z-10">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-12 pb-16 pt-4 relative z-10">
      <Suspense fallback={<LoadingState type="admin" />}>
        <AdminContent />
      </Suspense>
    </div>
  );
}
