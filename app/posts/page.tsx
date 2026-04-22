import { Suspense } from "react";
import PostsClient from "@/components/posts-client";
import { supabase } from "@/lib/supabase";
import LoadingState from "@/components/loading";

export const dynamic = "force-dynamic";

async function PostsList() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return <PostsClient posts={posts || []} />;
}

export default function PostsPage() {
  return (
    <Suspense fallback={<LoadingState type="posts" />}>
      <PostsList />
    </Suspense>
  );
}
