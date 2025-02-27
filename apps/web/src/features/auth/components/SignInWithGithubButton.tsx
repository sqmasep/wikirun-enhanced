import { apiClient } from "#/lib/apiClient";
import { Button } from "@repo/ui/button";
import GithubIcon from "@repo/ui/icons/GithubIcon";

export default function SignInWithGithubButton() {
  return (
    <Button asChild>
      <a href={apiClient.auth.github.$url().toString()}>
        <GithubIcon />
        Sign in with GitHub
      </a>
    </Button>
  );
}
