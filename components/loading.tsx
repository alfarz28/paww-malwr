"use client";

import { motion } from "framer-motion";

interface LoadingProps {
  type?: "global" | "posts" | "admin" | "post";
}

export default function LoadingState({ type = "global" }: LoadingProps) {
  if (type === "global") {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]/80 backdrop-blur-md">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-24 h-24 -m-4 border-t-2 border-primary/30 border-r-2 border-transparent rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-20 h-20 -m-2 border-b-2 border-primary/20 border-l-2 border-transparent rounded-full"
          />
          <div className="relative w-16 h-16 border-2 border-white/5 border-t-primary rounded-full animate-spin shadow-[0_0_20px_rgba(16,185,129,0.2)]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_rgba(16,185,129,1)]"></div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping"></span>
            <span className="text-primary font-mono text-sm tracking-[0.3em] uppercase">
              Decrypting Data
            </span>
          </div>
          <div className="w-40 h-0.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === "posts") {
    return (
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-12 pb-16 pt-4 relative z-10">
        <div>
          <div className="h-10 w-64 bg-white/5 rounded-lg animate-pulse mb-4"></div>
          <div className="h-6 w-96 bg-white/5 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card rounded-xl p-6 border border-white/5 min-h-[160px]">
              <div className="flex justify-between items-start mb-4">
                <div className="h-4 w-32 bg-white/5 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-white/5 rounded animate-pulse"></div>
              </div>
              <div className="h-8 w-full bg-white/5 rounded-lg animate-pulse mb-6"></div>
              <div className="h-4 w-28 bg-white/5 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "admin") {
    return (
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-12 pb-16 pt-4 relative z-10">
        <div className="glass-card rounded-xl p-8 border border-primary/10">
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 w-64 bg-white/5 rounded-lg animate-pulse"></div>
            <div className="h-10 w-40 bg-white/5 rounded-lg animate-pulse"></div>
          </div>
          <div className="bg-black/40 border border-white/10 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-white/10 flex gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 flex-1 bg-white/5 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="divide-y divide-white/5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-6 flex gap-4">
                  <div className="h-4 flex-1 bg-white/5 rounded animate-pulse"></div>
                  <div className="h-4 flex-1 bg-white/5 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-white/5 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-white/5 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "post") {
    return (
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-12 pb-16 pt-4 relative z-10">
        <div className="h-4 w-32 bg-white/5 rounded animate-pulse"></div>
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-6 w-28 bg-white/5 rounded-full animate-pulse"></div>
            <div className="h-6 w-32 bg-white/5 rounded-full animate-pulse"></div>
          </div>
          <div className="h-12 w-3/4 bg-white/5 rounded-lg animate-pulse mb-6"></div>
          <div className="h-8 w-1/2 bg-white/5 rounded-lg animate-pulse"></div>
        </div>
        <div className="glass-card rounded-xl p-8 sm:p-10 space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div 
              key={i} 
              className="h-4 bg-white/5 rounded animate-pulse"
              style={{ width: `${Math.random() * 40 + 60}%` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
