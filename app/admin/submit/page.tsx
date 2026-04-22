import { LoginForm, SubmitForm } from "./client-forms";
import { isAuthenticated } from "./actions";

export default async function AdminSubmitPage() {
  const isAuth = await isAuthenticated();

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-12 pb-16 pt-4 relative z-10">
      {isAuth ? <SubmitForm /> : <LoginForm />}
    </div>
  );
}
