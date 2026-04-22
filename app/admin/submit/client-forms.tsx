"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Save, CheckCircle2 } from "lucide-react";
import { verifyPassword, submitWriteup, updateWriteup } from "./actions";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await verifyPassword(password);
    if (!res.success) {
      setError(res.error || "Authentication failed");
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card max-w-md mx-auto rounded-xl p-8 border border-primary/20 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
    >
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-4 box-glow">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Admin Access</h2>
        <p className="text-gray-400 text-sm mt-2 text-center">
          Please enter the master password to access the CMS.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-gray-300 mb-1.5 block">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-dark text-black font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(16,185,129,0.4)]"
        >
          {isLoading ? "Verifying..." : "Unlock Access"}{" "}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
}

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

const MenuBar = ({ editor }: { editor: any }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        editor.chain().focus().setImage({ src: result }).run();
      };
      reader.readAsDataURL(file);
    }
    // Reset the input value so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4 p-2 bg-black/40 rounded-lg border border-white/10">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive("bold") ? "bg-primary text-black" : "text-gray-300 hover:bg-white/10"}`}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive("italic") ? "bg-primary text-black" : "text-gray-300 hover:bg-white/10"}`}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive("heading", { level: 2 }) ? "bg-primary text-black" : "text-gray-300 hover:bg-white/10"}`}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive("heading", { level: 3 }) ? "bg-primary text-black" : "text-gray-300 hover:bg-white/10"}`}
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive("codeBlock") ? "bg-primary text-black" : "text-gray-300 hover:bg-white/10"}`}
      >
        Code Block
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="px-3 py-1.5 rounded text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors"
      >
        Add Image
      </button>
    </div>
  );
};

export function SubmitForm({ post }: { post?: any }) {
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-lg border border-white/10 my-4 max-w-full",
        },
      }),
    ],
    content: post?.content || "<p>Write your CTF documentation here...</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-sm sm:prose-base prose-p:my-2 focus:outline-none min-h-[300px] max-w-none",
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    if (editor) {
      formData.set("content", editor.getHTML());
    }

    let res;
    if (post) {
      res = await updateWriteup(post.id, formData);
    } else {
      res = await submitWriteup(formData);
    }

    if (res.success) {
      setStatus("success");
      if (!post) {
        (e.target as HTMLFormElement).reset();
        editor?.commands.setContent("");
      }
      setTimeout(() => {
        setStatus("idle");
        if (post) router.push("/admin");
      }, 2000);
    } else {
      setStatus("error");
      setErrorMsg(res.error || "Failed to save writeup");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card max-w-4xl mx-auto rounded-xl p-8 border border-primary/20"
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-primary rounded-full box-glow"></span>
        {post ? "Edit Writeup" : "Create New Writeup"}
      </h2>

      {status === "success" && (
        <div className="mb-6 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          {post ? "Writeup successfully updated!" : "Writeup successfully saved to database!"}
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-1.5 block">
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              defaultValue={post?.title}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-primary/50"
              placeholder="e.g. Exploiting WebLogic Server..."
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300 mb-1.5 block">
              Competition
            </label>
            <input
              type="text"
              name="comp"
              required
              defaultValue={post?.comp}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-primary/50"
              placeholder="e.g. DEFCON Quals 2023"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300 mb-1.5 block">
            Date Published
          </label>
          <input
            type="date"
            name="date"
            required
            defaultValue={post?.date}
            className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-primary/50 [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300 mb-1.5 block">
            Rich Content
          </label>
          <div className="bg-black/40 border border-white/10 rounded-lg p-4">
            <MenuBar editor={editor} />
            <div className="p-4 bg-[#0a120e] rounded-lg border border-white/5 min-h-75">
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-white/10">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="bg-white/5 hover:bg-white/10 text-white font-semibold py-2.5 px-8 rounded-lg transition-all flex items-center justify-center gap-2 border border-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-primary hover:bg-primary-dark text-black font-semibold py-2.5 px-8 rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-70"
            >
              <Save className="w-4 h-4" />
              {status === "loading" ? "Saving..." : post ? "Update Writeup" : "Publish Writeup"}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
