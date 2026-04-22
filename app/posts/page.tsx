import PostsClient from "@/components/posts-client";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return <PostsClient posts={posts || []} />;
}
