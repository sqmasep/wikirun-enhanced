import { apiClient } from "#/lib/apiClient";
import GithubIcon from "@repo/ui/icons/GithubIcon";

export default function SignInWithGithubButton() {
  return (
    <a href={apiClient.auth.github.$url().toString()}>
      <GithubIcon />
      Sign in with GitHub
    </a>
  );
}
