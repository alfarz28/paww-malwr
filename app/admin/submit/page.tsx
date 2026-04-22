import { cookies } from "next/headers";
import { LoginForm, SubmitForm } from "./client-forms";

export default async function AdminSubmitPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_auth")?.value === "true";

  return (
    <div className="pt-16 pb-16 relative z-10 w-full max-w-5xl mx-auto">
      {isAuthenticated ? <SubmitForm /> : <LoginForm />}
    </div>
  );
}
