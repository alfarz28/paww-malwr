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
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-12 pb-16 pt-4 relative z-10">
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
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-12 pb-16 pt-4 relative z-10">
      <SubmitForm post={post} />
    </div>
  );
}
