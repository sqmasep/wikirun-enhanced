import SignInWithGithubButton from "#/features/auth/components/SignInWithGithubButton";
import SignUpForm from "#/features/auth/components/forms/SignUpForm";
import Navbar from "#/layouts/Navbar";

export default function SignUp() {
  return (
    <div>
      <Navbar />
      <h1>Sign up</h1>

      <SignUpForm />

      <SignInWithGithubButton />
    </div>
  );
}
