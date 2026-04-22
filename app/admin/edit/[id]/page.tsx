import { supabase } from "@/lib/supabase";
import { LoginForm, SubmitForm } from "@/app/admin/submit/client-forms";
import { notFound } from "next/navigation";
import { isAuthenticated } from "@/app/admin/submit/actions";

export const dynamic = "force-dynamic";

export default async function AdminEditPage({ params }: { params: Promise<{ id: string }> }) {
  const isAuth = await isAuthenticated();
  
  const { id } = await params;

  if (!isAuth) {
    return (
      <div className="pt-16 pb-16 relative z-10 w-full max-w-5xl mx-auto">
        <LoginForm />
      </div>
    );
  }

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div className="pt-16 pb-16 relative z-10 w-full max-w-5xl mx-auto">
      <SubmitForm post={post} />
    </div>
  );
}
