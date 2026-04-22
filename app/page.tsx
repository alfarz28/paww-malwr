import HomeClient from "@/components/home-client";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: recentPosts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  return <HomeClient recentPosts={recentPosts || []} />;
}
