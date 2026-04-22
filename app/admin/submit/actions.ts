"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function getSecureToken() {
  const secret = process.env.ADMIN_PASSWORD || "fallback_secret_xyz";
  const msgUint8 = new TextEncoder().encode(secret + "_paww_admin_salt_2026");
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_auth")?.value;
  if (!authCookie) return false;
  const expectedToken = await getSecureToken();
  return authCookie === expectedToken;
}

export async function verifyPassword(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    return { success: false, error: "Wrong Password" };
  }
  
  if (password === adminPassword) {
    const cookieStore = await cookies();
    const token = await getSecureToken();
    
    cookieStore.set("admin_auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "strict"
    });
    
    revalidatePath("/admin");
    revalidatePath("/admin/submit");
    return { success: true };
  }
  
  return { success: false, error: "Invalid password" };
}

export async function submitWriteup(formData: FormData) {
  const isAuth = await isAuthenticated();
  
  if (!isAuth) {
    return { success: false, error: "Unauthorized" };
  }
  
  const title = formData.get("title") as string;
  const comp = formData.get("comp") as string;
  const date = formData.get("date") as string;
  const content = formData.get("content") as string;
  
  if (!title || !comp || !date || !content) {
    return { success: false, error: "All fields are required" };
  }

  const { error } = await supabase.from('posts').insert({ 
    title, 
    comp, 
    date, 
    content 
  });
  
  if (error) {
    return { success: false, error: `Supabase Error: ${error.message}` };
  }
  
  revalidatePath("/");
  revalidatePath("/posts");
  return { success: true };
}

export async function deleteWriteup(id: string) {
  const isAuth = await isAuthenticated();
  
  if (!isAuth) {
    return { success: false, error: "Unauthorized" };
  }
  
  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) {
    return { success: false, error: error.message };
  }
  
  revalidatePath("/admin");
  revalidatePath("/posts");
  revalidatePath("/");
  return { success: true };
}

export async function updateWriteup(id: string, formData: FormData) {
  const isAuth = await isAuthenticated();
  
  if (!isAuth) {
    return { success: false, error: "Unauthorized" };
  }
  
  const title = formData.get("title") as string;
  const comp = formData.get("comp") as string;
  const date = formData.get("date") as string;
  const content = formData.get("content") as string;
  
  if (!title || !comp || !date || !content) {
    return { success: false, error: "All fields are required" };
  }

  const { error } = await supabase.from('posts').update({ 
    title, 
    comp, 
    date, 
    content 
  }).eq('id', id);
  
  if (error) {
    return { success: false, error: `Supabase Error: ${error.message}` };
  }
  
  revalidatePath("/admin");
  revalidatePath("/posts");
  revalidatePath(`/posts/${id}`);
  revalidatePath("/");
  return { success: true };
}
