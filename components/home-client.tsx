"use client";

import Card from "@/components/card";
import { motion } from "framer-motion";
import { Clock, Pin } from "lucide-react";
import Link from "next/link";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function HomeClient({ recentPosts }: { recentPosts: any[] }) {
  const pinnedPost = recentPosts.length > 0 ? recentPosts[0] : null;
  const listPosts = recentPosts.length > 1 ? recentPosts.slice(1, 5) : [];

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-12 pb-16 pt-4 relative z-10">
      <section className="flex flex-col items-start text-left relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white break-all sm:break-normal"
        >
          paww.malwr.id
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 text-lg flex items-start gap-2"
        >
          <span className="text-primary font-mono">{">"}</span>
          Just a collection of writeups from various CTF challenges I've done. I
          hope you find something useful!
        </motion.p>
      </section>

      {/* Pinned Section */}
      {pinnedPost && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 flex flex-col gap-4"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 tracking-widest uppercase">
            <Pin className="w-4 h-4 text-primary" />
            <span>Pinned</span>
          </div>
          <Card
            id={pinnedPost.id}
            title={pinnedPost.title}
            date={pinnedPost.date}
            comp={pinnedPost.comp}
          />
        </motion.section>
      )}

      {/* Recent Posts Section */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 flex flex-col gap-4"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 tracking-widest uppercase mt-4">
          <Clock className="w-4 h-4" />
          <span>Recent Posts</span>
        </div>

        <div className="flex flex-col gap-4">
          {listPosts.length > 0 ? (
            listPosts.map((post) => (
              <Card
                key={post.id}
                id={post.id}
                title={post.title}
                date={post.date}
                comp={post.comp}
              />
            ))
          ) : (
            <div className="py-8 text-left text-gray-500 text-sm">
              No recent writeups found.
            </div>
          )}
        </div>
      </motion.section>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex justify-center mt-8 relative z-10"
      >
        <Link
          href="/posts"
          className="bg-primary/20 hover:bg-primary/30 text-primary hover:text-primary-glow border border-primary/30 px-6 py-2.5 rounded-lg font-medium transition-all text-sm flex items-center gap-2"
        >
          View all posts <span className="text-lg leading-none">→</span>
        </Link>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center gap-4 text-gray-500 text-xs relative z-10"
      >
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/alfarz28"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/alfaridzahamdani"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>
        <p>© 2026 paww · Investigating incidents, one artifact at a time</p>
      </motion.footer>
    </div>
  );
}
