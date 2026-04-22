"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function verifyPassword(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    return { success: false, error: "Wrong Password" };
  }
  
  if (password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set("admin_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    
    revalidatePath("/admin/submit");
    return { success: true };
  }
  
  return { success: false, error: "Invalid password" };
}

export async function submitWriteup(formData: FormData) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_auth")?.value === "true";
  
  if (!isAuthenticated) {
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
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_auth")?.value === "true";
  
  if (!isAuthenticated) {
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
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_auth")?.value === "true";
  
  if (!isAuthenticated) {
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
