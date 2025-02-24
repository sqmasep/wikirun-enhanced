import SignInWithGithubButton from "#/features/auth/components/SignInWithGithubButton";
import SignInForm from "#/features/auth/components/forms/SignInForm";
import Navbar from "#/layouts/Navbar";

export default function SignIn() {
  return (
    <div>
      <Navbar />
      <h1>Sign in</h1>

      <SignInForm />

      <SignInWithGithubButton />
    </div>
  );
}
