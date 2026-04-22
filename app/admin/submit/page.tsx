import { LoginForm, SubmitForm } from "./client-forms";
import { isAuthenticated } from "./actions";

export default async function AdminSubmitPage() {
  const isAuth = await isAuthenticated();

  return (
    <div className="pt-16 pb-16 relative z-10 w-full max-w-5xl mx-auto">
      {isAuth ? <SubmitForm /> : <LoginForm />}
    </div>
  );
}
