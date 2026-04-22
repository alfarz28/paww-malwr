"use client";

import Card from "@/components/card";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";

export default function PostsClient({ posts }: { posts: any[] }) {
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.comp.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-12 pb-16 pt-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          All <span className="text-primary text-glow">Writeups</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Just a collection of writeups from various CTF challenges I've done. I hope you find something useful!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative max-w-xl"
      >
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search by title or competition..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col gap-4 w-full"
      >
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card
              key={post.id}
              id={post.id}
              title={post.title}
              date={post.date}
              comp={post.comp}
            />
          ))
        ) : (
          <div className="py-12 text-center text-gray-500 glass-card rounded-xl">
            {posts.length === 0
              ? "No writeups available in the database yet."
              : "No writeups found matching your search."}
          </div>
        )}
      </motion.div>
    </div>
  );
}
