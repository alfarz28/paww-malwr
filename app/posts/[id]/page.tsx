import { ArrowLeft, Calendar, Flag } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const revalidate = 0; // Disable cache so new posts appear immediately

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error || !post) {
    notFound();
  }
  
  return (
    <div className="max-w-4xl mx-auto pb-16 pt-8 relative z-10">
      <Link 
        href="/posts" 
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to writeups
      </Link>
      
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
            <Flag className="w-3 h-3" />
            CTF Writeup
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 text-white text-glow">
          {post.title}
        </h1>
        
        <div className="text-lg text-gray-400 border-l-2 border-primary/50 pl-4 py-1">
          Competition: <span className="font-semibold text-gray-200">{post.comp}</span>
        </div>
      </div>
      
      {/* Rich Text CMS Content */}
      <div 
        className="glass-card rounded-xl p-8 sm:p-10 prose prose-invert prose-emerald max-w-none prose-pre:bg-[#0a120e] prose-pre:border prose-pre:border-white/10 prose-img:rounded-lg prose-img:border prose-img:border-white/10 prose-p:my-2"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
