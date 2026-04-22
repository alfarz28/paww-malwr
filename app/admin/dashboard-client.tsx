"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Plus, LogOut, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { deleteWriteup } from "./submit/actions";
import { useRouter } from "next/navigation";

export default function AdminDashboardClient({ posts }: { posts: any[] }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setPostToDelete(id);
  };

  const confirmDelete = async (id: string) => {
    setIsDeleting(id);
    const res = await deleteWriteup(id);
    
    if (res.success) {
      setMessage("Writeup deleted successfully.");
      setPostToDelete(null);
      router.refresh();
      setTimeout(() => setMessage(""), 3000);
    } else {
      alert(res.error || "Failed to delete writeup");
    }
    setIsDeleting(null);
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card max-w-5xl mx-auto rounded-xl p-8 border border-primary/20"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-1.5 h-6 bg-primary rounded-full box-glow"></span>
          Content Management
        </h2>
        
        <div className="flex gap-4">
          <Link
            href="/admin/submit"
            className="bg-primary hover:bg-primary-dark text-black font-semibold py-2 px-4 rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <Plus className="w-4 h-4" /> Add New Writeup
          </Link>
        </div>
      </div>

      {message && (
        <div className="mb-6 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          {message}
        </div>
      )}

      <div className="bg-black/40 border border-white/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/10 text-gray-400 text-sm">
              <tr>
                <th className="py-3 px-4 font-medium">Title</th>
                <th className="py-3 px-4 font-medium">Competition</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-medium text-white">{post.title}</td>
                    <td className="py-3 px-4">{post.comp}</td>
                    <td className="py-3 px-4">{post.date}</td>
                    <td className="py-3 px-4 flex justify-end gap-2">
                      <Link
                        href={`/admin/edit/${post.id}`}
                        className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-md transition-colors"
                        title="Edit Writeup"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(post.id)}
                        disabled={isDeleting === post.id}
                        className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-md transition-colors disabled:opacity-50"
                        title="Delete Writeup"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">
                    No writeups found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>

      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0a120e] border border-white/10 p-6 rounded-xl max-w-sm w-full shadow-2xl"
          >
            <h3 className="text-xl font-bold text-white mb-2">Delete Writeup</h3>
            <p className="text-gray-400 mb-6 text-sm">
              Are you sure you want to delete this writeup? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPostToDelete(null)}
                disabled={isDeleting !== null}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors text-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(postToDelete)}
                disabled={isDeleting !== null}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
              >
                {isDeleting === postToDelete ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
