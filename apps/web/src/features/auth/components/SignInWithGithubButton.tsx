import { apiClient } from "../../../lib/apiClient";

export default function SignInWithGithubButton() {
  return (
    <a className="underline" href={apiClient.auth.github.$url().toString()}>
      Sign in with GitHub
    </a>
  );
}
