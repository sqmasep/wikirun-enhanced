import SignInWithGithubButton from "#auth/components/SignInWithGithubButton";
import SignInForm from "#auth/components/forms/SignInForm";
import Navbar from "#/layouts/Navbar";
import Link from "next/link";

export default function SignIn() {
  return (
    <div>
      <Navbar />
      <div className="mx-auto h-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <SignInForm />

        <span className="block text-center text-xs font-medium text-zinc-500 uppercase">
          or
        </span>

        <SignInWithGithubButton className="w-full" />

        <p className="mt-4">
          Don't have an account?{" "}
          <Link
            className="text-blue-300 underline hover:decoration-2"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
